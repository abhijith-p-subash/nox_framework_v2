import { ModelService } from "../../../core/mongo/model.service";

export class UserService extends ModelService {
  constructor(userModel: any) {
    super(userModel);
  }

  async testApi() {
    return "<H1>TEST API</H1>";
  }
}
