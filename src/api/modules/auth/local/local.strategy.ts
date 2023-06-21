import passportLocal from "passport-local";
import { UserService } from "../../user/user.service.js";
import { Job } from "../../../../utils/job.js";
import { UserModel } from "../../user/entities/user.entity.js";

const LocalStrategy = passportLocal.Strategy;
const userService = new UserService(UserModel);

export const localAuth = new LocalStrategy(async (username, password, done) => {
  console.log(username);

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

  console.log("USER DATA", data);

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
