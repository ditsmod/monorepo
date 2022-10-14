import { Content, mediaTypeName, ContentOptions, Property } from '@ditsmod/openapi';

/**
 * Used to form an example HTTP response in OpenAPI.
 */
export class MetaContent extends Content {
  override set<T extends mediaTypeName = mediaTypeName>(contentOptions: ContentOptions<T>) {
    contentOptions = { ...contentOptions };
    class ApiResponse {
      @Property({ type: 'array' }, { array: contentOptions.model! })
      data: any[];
      @Property()
      meta: any;
      @Property()
      error: any;
    }
    contentOptions.model = ApiResponse;
    return super.set(contentOptions);
  }
}

export function getMetaContent<T extends mediaTypeName = mediaTypeName>(contentOptions?: ContentOptions<T>): any {
  return new MetaContent().get(contentOptions);
}
