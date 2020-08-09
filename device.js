const program = require("commander");

const { addDevice, listDevices, switchStatus } = require("./logic");
const { prompt } = require("inquirer");

program.version("0.0.1").description("Digital Home Application");

const addDeviceQuestions = [
  {
    type: "input",
    name: "name",
    message: "Enter device name:",
  },
  {
    type: "input",
    name: "deviceId",
    message: "Enter custom device ID:",
  },
  {
    type: "input",
    name: "status",
    message: "Enter device status (on/off):",
  },
  {
    type: "input",
    name: "range",
    message: "Enter device range:",
  },
];

program
  .command("addDevice")
  .alias("a")
  .description("Add a device")
  .action(() => {
    prompt(addDeviceQuestions).then((answers) => addDevice(answers));
  });

program
  .command("listDevices")
  .alias("l")
  .description("List all devices")
  .action(() => listDevices());

program
  .command("switchStatus <_id>")
  .alias("s")
  .description("Turn device on or off")
  .action((_id) => {
    prompt(addDeviceQuestions).then((answers) => switchStatus(_id, answers));
  });

// Assert that a VALID command is provided
if (!process.argv.slice(2).length || !/[arudl]/.test(process.argv.slice(2))) {
  program.outputHelp();
  process.exit();
}

program.parse(process.argv);
