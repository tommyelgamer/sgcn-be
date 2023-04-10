import EPermission from './permission/permission.type';

export enum ERoleName {
  SYS_ADMIN = 'SYS_ADMIN',
  CHAMPIONSHIP_ADMIN = 'CHAMPIONSHIP_ADMIN',
  OFFICE = 'OFFICE',
  JURY = 'JURY',
  RACE_OFFICER = 'RACE_OFFICER',
}

export const rolePermission = {
  [ERoleName.SYS_ADMIN]: [
    EPermission.CreateDocument,
    EPermission.DeleteDocument,
  ],
  [ERoleName.CHAMPIONSHIP_ADMIN]: [
    EPermission.CreateDocument,
    EPermission.DeleteDocument,
  ],
  [ERoleName.OFFICE]: [EPermission.CreateDocument, EPermission.DeleteDocument],
  [ERoleName.JURY]: [],
  [ERoleName.RACE_OFFICER]: [],
};
