import EPermission from './permission/permission.type';

export enum ERoleName {
  SYS_ADMIN = 'SYS_ADMIN',
  CHAMPIONSHIP_ADMIN = 'CHAMPIONSHIP_ADMIN',
  OFFICE = 'OFFICE',
  SCOREKEEPER = 'SCOREKEEPER',
  JURY = 'JURY',
  RACE_OFFICER = 'RACE_OFFICER',
}

export const rolePermission = {
  [ERoleName.SYS_ADMIN]: [
    EPermission.CreateDocument,
    EPermission.DeleteDocument,

    EPermission.CreateResult,
    EPermission.DeleteResult,
    EPermission.RetrieveHiddenResults,
    EPermission.UpdateResultHiddenStatus,
  ],
  [ERoleName.CHAMPIONSHIP_ADMIN]: [
    EPermission.CreateDocument,
    EPermission.DeleteDocument,

    EPermission.CreateResult,
    EPermission.DeleteResult,
    EPermission.RetrieveHiddenResults,
    EPermission.UpdateResultHiddenStatus,
  ],
  [ERoleName.OFFICE]: [
    EPermission.CreateDocument,
    EPermission.DeleteDocument,

    EPermission.CreateResult,
    EPermission.DeleteResult,
    EPermission.RetrieveHiddenResults,
    EPermission.UpdateResultHiddenStatus,
  ],
  [ERoleName.SCOREKEEPER]: [
    EPermission.CreateResult,
    EPermission.RetrieveHiddenResults,
    EPermission.UpdateResultHiddenStatus,
    EPermission.DeleteResult,
  ],
  [ERoleName.JURY]: [],
  [ERoleName.RACE_OFFICER]: [],
};
