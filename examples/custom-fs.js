async function main() {
  console.log("Start");

  await new Promise((resolve) => {
    joya.loop.setTimeout(() => {
      console.log("Timeout done");
      resolve();
    }, 1000);
  });

  console.log("After await");

  joya.loop.exit();
}

main();
