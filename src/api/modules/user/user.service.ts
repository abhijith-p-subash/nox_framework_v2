import { ModelService } from "../../../core/modules/mongo/model.service";

export class UserService extends ModelService {
  constructor(userModel: any) {
    super(userModel);
  }

  async testApi() {
    return "<H1>TEST API</H1>";
  }
}
