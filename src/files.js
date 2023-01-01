import { supported, fileSave, fileOpen } from "browser-fs-access";

const mimeType = "text/plain";
const options = {
  mimeTypes: [mimeType],
  extensions: [".txt", ".md"],
  description: "Text files",
  fileName: "Untitled.txt",
};

export const canLink = supported;

export async function newTextFile(content) {
  try {
    const maybeHandle = await fileSave(
      new Blob([content], { type: mimeType }),
      options
    );
    return { success: true, handle: canLink ? maybeHandle : null };
  } catch {
    return { success: false };
  }
}

export async function saveToThisTextFile({ content, handle }) {
  if (!handle) return { success: false };

  try {
    await fileSave(new Blob([content], { type: mimeType }), options, handle);
    return { success: true };
  } catch {
    return { success: false };
  }
}

export async function openTextFile() {
  try {
    // fileOpen will return a lib specific File type that (differently from the vanilla File interface) can have a handle property. This handle will only be present if the browser supports the files system api.
    const file = await fileOpen(options);
    const handle = canLink ? file.handle : null;
    const content = await file.text();
    return { success: true, content, handle };
  } catch {
    return { success: false };
  }
}

export async function openThisTextFile(maybeHandle) {
  try {
    const file = await maybeHandle.getFile();
    const content = await file.text();
    return { success: true, content };
  } catch {
    return { success: false };
  }
}
