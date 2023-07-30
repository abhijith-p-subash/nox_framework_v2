import passportLocal from "passport-local";
import { UserService } from "../../user/user.service";
import { Job } from "../../../../core/utils/job";
import { User } from "../../user/entities/user.model";

const LocalStrategy = passportLocal.Strategy;
const userService = new UserService(User);

export const localAuth = new LocalStrategy(async (username, password, done) => {
  const { data, error } = await userService.findOne(
    new Job({
      action: "findOne",
      options: {
        where: {
          email: username,
        },
      },
    })
  );

  if (!!error) {
    return done(error, false);
  } else {
    // if (!data.active) {
    //   return done("Account inactive", false);
    // }

    if (data) {
      return done(null, data);
    } else {
      return done(null, false);
    }
  }
});
