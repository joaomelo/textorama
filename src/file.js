const types = [
  {
    description: "Text files",
    accept: { "text/plain": [".txt", ".md"] },
  },
];

export async function open() {
  const [handle] = await showOpenFilePicker({
    types,
  });
  const file = await handle.getFile();
  const content = await file.text();
  return { handle, content };
}

export async function save({ handle, content }) {
  const stream = await handle.createWritable();
  stream.write(content);
  stream.close();
}

export async function saveAs(content) {
  const handle = await showSaveFilePicker({
    types,
  });
  await save({ handle, content });
  return handle;
}
