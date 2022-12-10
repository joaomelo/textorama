import { supported, fileSave, fileOpen } from "browser-fs-access";

const mimeType = "text/plain";
const options = {
  mimeTypes: [mimeType],
  extensions: [".txt", ".md"],
  description: "Text files",
  fileName: "Untitled.txt",
};

export const canLink = supported;

export async function saveTextFileAs(newContent) {
  try {
    const maybeHandle = await fileSave(
      new Blob([newContent], { type: mimeType }),
      options
    );
    const handle = canLink ? maybeHandle : null;
    return { success: true, handle };
  } catch {
    return { success: false };
  }
}

export async function openTextFile() {
  try {
    // fileOpen will return a lib specific File type that (differently from the vanilla File interface) can have a handle property. This will only happen if the browser supports the files system api.
    const file = await fileOpen(options);
    const handle = canLink ? file.handle : null;
    const content = await file.text();
    return { success: true, content, handle };
  } catch {
    return { success: false };
  }
}
