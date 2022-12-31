import { createApp } from "vue";
import { createVuesticEssential, VaButton } from "vuestic-ui";
import "vuestic-ui/styles/essential.css";
import "vuestic-ui/styles/typography.css";
import "vuestic-ui/styles/reset.css";

import welcome from "../README.md?raw";
import { version } from "../package.json";

import App from "./app.vue";
import { TextRecord } from "./text-record";

export async function initApp(elementId) {
  const textRecord = new TextRecord();
  const fileHandle = await wasFileLaunched(textRecord);
  if (fileHandle) {
    textRecord.open(fileHandle);
  } else {
    textRecord.dirty(welcome);
  }

  const app = createApp(App, {
    version,
    textRecord,
  });

  const vuestic = createVuesticEssential({
    components: { VaButton },
  });
  app.use(vuestic);

  app.mount(elementId);
}

function wasFileLaunched() {
  return new Promise((resolve) => {
    if (!("launchQueue" in window)) return resolve();
    if (!("files" in LaunchParams.prototype)) return resolve();

    // setConsumer does not triggers if the app is not launched by file, so it is not a good place to branch what to do in every launch situation
    let invoked = false;
    launchQueue.setConsumer((launchParams) => {
      invoked = true;
      if (launchParams.files.length <= 0) return resolve();
      const fileHandle = launchParams.files[0];
      resolve(fileHandle);
    });

    setTimeout(() => {
      if (!invoked) resolve();
    }, 10);
  });
}
