// todo: make this pass
import Ping from "../../../src/commands/general/ping.js";
import {CommandInteraction} from "discord.js";

describe("Ping Command", () => {
    beforeAll(()=>{
        // todo, start the bot
    });

    it("should be a valid endpoint", async () => {
        const mockInteraction = {
            reply: jasmine.createSpy('reply').and.callFake(() => ({
                createdTimestamp: Date.now(),
            })),
            editReply: jasmine.createSpy('editReply'),
            createdTimestamp: Date.now(),
            client: {} as any
        } as unknown as CommandInteraction;

        // Invoke the ping command.
        await Ping.execute(mockInteraction);
let params = {
    content: 'Pinging...',
    fetchReply: true,
}
        // Verify that the interaction.reply() method was called with the correct message.
        expect(mockInteraction.reply).toHaveBeenCalledWith(params);

        const reply = await mockInteraction.reply({
            content: 'Pinging...',
            fetchReply: true,
        });
        // Simulate a delay of 100ms.
        jasmine.clock().install();
        jasmine.clock().tick(100);

        // Verify that the interaction.editReply() method was called with the correct message.
        expect(mockInteraction.editReply).toHaveBeenCalledWith({
            content: `Pong! Latency is \`${reply.createdTimestamp - mockInteraction.createdTimestamp}ms\`. \nAPI Latency is \`0ms\``,
        });

        // Uninstall the mock clock.
        jasmine.clock().uninstall();

        // example assertion that will always pass:
       expect(1).toBe(1);
    });
});
