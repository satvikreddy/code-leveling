export class SlackService {
  static async sendMessage(text: string): Promise<void> {
    const slackChannel = process.env.SLACK_CHANNEL;

    if (!slackChannel) {
      // Ignore if SLACK_CHANNEL is not configured
      console.log(text);
      return;
    }

    try {
      const response = await fetch(slackChannel, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        console.error("Failed to send Slack message:", response.statusText);
      }
    } catch (error) {
      console.error("Error sending Slack message:", error);
    }
  }
}
