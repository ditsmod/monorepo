export const enum Permission {
  /**
   * Can activate `/administration` section
   */
  canActivateAdministration = 1,
  /**
   * Can activate `/administration/posts-review` section
   */
  canActivatePostsReview = 2,
  /**
   * Can change any post (is a moderator).
   */
  canEditAnyPost = 3,
  /**
   * Can publish any post (is a moderator).
   */
  canPublishAnyPost = 4,
  /**
   * Can hide any post (is a moderator).
   */
  canHideAnyPost = 5,
}
