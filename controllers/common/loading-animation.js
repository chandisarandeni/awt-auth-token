// controllers/common/loading-animation.js
import ora from "ora";

export async function showLoadingAnimation() {
  const spinner = ora("Loading\n").start(); // Start the spinner

  try {
    // Simulate some async operation, like fetching data
    await new Promise((resolve) => setTimeout(resolve, 800)); // Replace with actual async task
  } catch (error) {
    console.error("Error occurred:", error);
  } finally {
    spinner.stop(); // Ensure spinner stops after the operation
  }
}
 