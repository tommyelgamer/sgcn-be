import EAudiencePermission from './audience-permission.enum';
import EDocumentPermission from './documentPermission.enum';
import EResultReviewPermission from './result-review-permission.enum';
import EResultPermission from './resultPermission.enum';
import EUserPermission from './userPermission.enum';

const EPermission = {
  ...EDocumentPermission,
  ...EResultPermission,
  ...EUserPermission,
  ...EAudiencePermission,
  ...EResultReviewPermission,
};

type EPermission =
  | EDocumentPermission
  | EResultPermission
  | EUserPermission
  | EAudiencePermission
  | EResultReviewPermission;

export default EPermission;
