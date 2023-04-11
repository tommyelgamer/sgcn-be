import EAudiencePermission from './audience-permission.enum';
import EDocumentPermission from './documentPermission.enum';
import EResultPermission from './resultPermission.enum';
import EUserPermission from './userPermission.enum';

const EPermission = {
  ...EDocumentPermission,
  ...EResultPermission,
  ...EUserPermission,
  ...EAudiencePermission,
};

type EPermission =
  | EDocumentPermission
  | EResultPermission
  | EUserPermission
  | EAudiencePermission;

export default EPermission;
