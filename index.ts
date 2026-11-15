import dotenv from "dotenv";
import path from "node:path";
import { config, higgsfield } from "@higgsfield/client/v2";

// Load server-side credentials from .env.local without logging or exposing values
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

if (!process.env.HF_CREDENTIALS) {
  console.error("Error: HF_CREDENTIALS is not set in .env.local (expected format: key-id:key-secret).");
  process.exit(1);
}

config({
  credentials: process.env.HF_CREDENTIALS,
});

interface VideoAsset {
  url?: string;
}

interface SeedanceSubscribeResult {
  status?: "queued" | "in_progress" | "completed" | "failed" | "nsfw" | "canceled" | string;
  request_id?: string;
  video?: VideoAsset | string;
  videos?: Array<VideoAsset | string>;
  jobs?: Array<{ status?: string; results?: { raw?: { url?: string }; min?: { url?: string } } }>;
  error?: unknown;
  detail?: unknown;
}

function extractVideoUrl(result: SeedanceSubscribeResult): string | undefined {
  if (typeof result.video === "string" && result.video.length > 0) {
    return result.video;
  }
  if (result.video && typeof result.video === "object" && typeof result.video.url === "string") {
    return result.video.url;
  }
  if (Array.isArray(result.videos) && result.videos.length > 0) {
    const first = result.videos[0];
    if (typeof first === "string") return first;
    if (first && typeof first === "object" && typeof first.url === "string") return first.url;
  }
  if (Array.isArray(result.jobs) && result.jobs.length > 0) {
    return result.jobs[0]?.results?.raw?.url ?? result.jobs[0]?.results?.min?.url;
  }
  return undefined;
}

async function main(): Promise<void> {
  console.log("Submitting Seedance 2.5 text-to-video request...");

  try {
    const result = (await higgsfield.subscribe(
      "bytedance/seedance-2.5/text-to-video",
      {
        input: {
          prompt: "A cinematic scene at sunset",
          duration: 5,
          resolution: "720p",
          aspect_ratio: "16:9",
        },
        withPolling: true,
      }
    )) as SeedanceSubscribeResult;

    const status = result?.status;
    const requestId = result?.request_id ?? "unknown";

    // Handle terminal non-success statuses explicitly without claiming success
    if (status === "failed") {
      console.error(
        `Generation failed (request_id: ${requestId}).`,
        result?.error ?? result?.detail ?? ""
      );
      process.exit(1);
    }

    if (status === "canceled") {
      console.error(`Generation was canceled before completion (request_id: ${requestId}).`);
      process.exit(1);
    }

    if (status === "nsfw") {
      console.error(`Generation was rejected by content moderation [nsfw] (request_id: ${requestId}).`);
      process.exit(1);
    }

    if (status && status !== "completed") {
      console.error(`Request ended in non-completed state "${status}" (request_id: ${requestId}).`);
      process.exit(1);
    }

    const videoUrl = extractVideoUrl(result);
    if (!videoUrl) {
      console.error(
        `Request finished (request_id: ${requestId}), but no video URL was found in the response.`
      );
      process.exit(1);
    }

    console.log("Generated Video URL:", videoUrl);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Higgsfield API request failed:", message);
    process.exit(1);
  }
}

main();