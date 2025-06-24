console.log("Start");

async function run() {
  const res = await new Promise((resolve) => {
    joya.loop.setTimeout(() => {
      resolve("done");
    }, 1000);
  });

  console.log("Await result:", res);
  joya.loop.exit();
}

run();
