"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Asset = void 0;
const typeorm_1 = require("typeorm");
let Asset = class Asset extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Asset.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar", length: 200, unique: true, nullable: false }),
    __metadata("design:type", String)
], Asset.prototype, "assetID", void 0);
__decorate([
    typeorm_1.Column({ type: "text", nullable: false }),
    __metadata("design:type", String)
], Asset.prototype, "title", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar", default: "Others" }),
    __metadata("design:type", String)
], Asset.prototype, "category", void 0);
__decorate([
    typeorm_1.Column({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Asset.prototype, "description", void 0);
__decorate([
    typeorm_1.Column({ type: "int", default: 0 }),
    __metadata("design:type", Number)
], Asset.prototype, "price", void 0);
__decorate([
    typeorm_1.Column({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Asset.prototype, "interval", void 0);
__decorate([
    typeorm_1.Column({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Asset.prototype, "owner", void 0);
__decorate([
    typeorm_1.Column({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Asset.prototype, "rentedBy", void 0);
__decorate([
    typeorm_1.Column({ type: "simple-array", nullable: true }),
    __metadata("design:type", Array)
], Asset.prototype, "image_urls", void 0);
__decorate([
    typeorm_1.Column({ type: "simple-array", nullable: true }),
    __metadata("design:type", Array)
], Asset.prototype, "reviews", void 0);
__decorate([
    typeorm_1.Column({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], Asset.prototype, "isAvailable", void 0);
__decorate([
    typeorm_1.Column({ type: "int", nullable: true }),
    __metadata("design:type", Number)
], Asset.prototype, "stars", void 0);
__decorate([
    typeorm_1.Column({ type: "int", nullable: true }),
    __metadata("design:type", Number)
], Asset.prototype, "insurance_amt", void 0);
Asset = __decorate([
    typeorm_1.Entity()
], Asset);
exports.Asset = Asset;
