import FakesUsersRepository from "@modules/users/repositories/fakes/FakesUsersRepository";
import AppError from "@shared/erros/AppError";
import ShowProfileService from "./ShowProfileService";

let fakeCreate: FakesUsersRepository;
let showProfile: ShowProfileService;

describe("UpdateProfile", () => {
    beforeEach(() => {
        fakeCreate = new FakesUsersRepository();
        showProfile = new ShowProfileService(fakeCreate);
    });
    it("should be able to show profile", async () => {
        const user = await fakeCreate.create({
            name: "John Doe",
            email: "rodrigoaraujo990@gmail.com",
            password: "1231",
        });
        const profile = await showProfile.execute({ user_id: user.id });

        expect(profile?.name).toBe("John Doe");
    });
    it("should not be able to change email with another email", async () => {
        await expect(
            showProfile.execute({ user_id: "user.id" }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
