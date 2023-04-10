import EDocumentPermission from './documentPermission.enum';
import EResultPermission from './resultPermission.enum';
import EUserPermission from './userPermission.enum';

const EPermission = {
  ...EDocumentPermission,
  ...EResultPermission,
  ...EUserPermission,
};

type EPermission = EDocumentPermission | EResultPermission | EUserPermission;

export default EPermission;
