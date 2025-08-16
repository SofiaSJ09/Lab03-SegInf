"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRiskDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_risk_dto_1 = require("./create-risk.dto");
class UpdateRiskDto extends (0, mapped_types_1.PartialType)(create_risk_dto_1.CreateRiskDto) {
}
exports.UpdateRiskDto = UpdateRiskDto;
//# sourceMappingURL=update-risk.dto.js.map