import passport from "passport";
import passportJwt, { ExtractJwt } from "passport-jwt";
import { UserService } from "../../user/user.service.js";
import { UserModel } from "../../user/entities/user.entity.js";
import { Job } from "../../../../utils/job.js";

const JwtStrategy = passportJwt.Strategy;
const userService = new UserService(UserModel);

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: `${process.env.ACCESS_TOKEN_SECRET}`,
};

export const jwtAuth = new JwtStrategy(opts, async (jwt_payload, done) => {
  // find the user in the database based on the sub claim in the JWT
  const { data, error } = await userService.findById(
    new Job({
      action: "findById",
      id: jwt_payload.userId,
    })
  );

  if (!!error) {
    return done(error, false);
  } else {
    if (data) {
      return done(null, data);
    } else {
      return done(null, false);
    }
  }
});
