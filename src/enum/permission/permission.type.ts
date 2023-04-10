import EDocumentPermission from './documentPermission.enum';
import EResultPermission from './resultPermission.enum';

const EPermission = {
  ...EDocumentPermission,
  ...EResultPermission,
};

type EPermission = EDocumentPermission | EResultPermission;

export default EPermission;
