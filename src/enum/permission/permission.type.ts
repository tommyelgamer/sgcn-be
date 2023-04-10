import EAudienceRequestPermission from './audience-request-permission.enum';
import EDocumentPermission from './documentPermission.enum';
import EResultPermission from './resultPermission.enum';
import EUserPermission from './userPermission.enum';

const EPermission = {
  ...EDocumentPermission,
  ...EResultPermission,
  ...EUserPermission,
  ...EAudienceRequestPermission,
};

type EPermission =
  | EDocumentPermission
  | EResultPermission
  | EUserPermission
  | EAudienceRequestPermission;

export default EPermission;
