import FakesUsersRepository from "@modules/users/repositories/fakes/FakesUsersRepository";
import FakeStorageProvider from "@shared/container/providers/StoredProvider/fakes/FakeStorageProvider";
import UpdateUserAvatar from "./UpdateAvatarUserService";

describe("UpdateUserAvatar", () => {
    it("should be able to update avatar", async () => {
        const fakeCreate = new FakesUsersRepository();
        const fakeStorage = new FakeStorageProvider();
        const updateAvatar = new UpdateUserAvatar(fakeCreate, fakeStorage);

        const user = await fakeCreate.create({
            name: "John Doe",
            email: "rodrigoaraujo990@gmail.com",
            password: "1231",
        });
        await updateAvatar.execute({
            user_id: user.id,
            filename: "avatar.jpg",
        });

        expect(user.avatar).toBe("avatar.jpg");
    });
});
