// @generated by protoc-gen-es v1.9.0 with parameter "target=ts"
// @generated from file filesystem/filesystem.proto (package filesystem, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";
import { User } from "../permissions/permissions_pb.js";

/**
 * @generated from enum filesystem.FileType
 */
export enum FileType {
  /**
   * @generated from enum value: FILE_TYPE_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * @generated from enum value: FILE_TYPE_FILE = 1;
   */
  FILE = 1,

  /**
   * @generated from enum value: FILE_TYPE_DIRECTORY = 2;
   */
  DIRECTORY = 2,
}
// Retrieve enum metadata with: proto3.getEnumType(FileType)
proto3.util.setEnumType(FileType, "filesystem.FileType", [
  { no: 0, name: "FILE_TYPE_UNSPECIFIED" },
  { no: 1, name: "FILE_TYPE_FILE" },
  { no: 2, name: "FILE_TYPE_DIRECTORY" },
]);

/**
 * @generated from enum filesystem.EventType
 */
export enum EventType {
  /**
   * @generated from enum value: EVENT_TYPE_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * @generated from enum value: EVENT_TYPE_CREATE = 1;
   */
  CREATE = 1,

  /**
   * @generated from enum value: EVENT_TYPE_WRITE = 2;
   */
  WRITE = 2,

  /**
   * @generated from enum value: EVENT_TYPE_REMOVE = 3;
   */
  REMOVE = 3,

  /**
   * @generated from enum value: EVENT_TYPE_RENAME = 4;
   */
  RENAME = 4,

  /**
   * @generated from enum value: EVENT_TYPE_CHMOD = 5;
   */
  CHMOD = 5,
}
// Retrieve enum metadata with: proto3.getEnumType(EventType)
proto3.util.setEnumType(EventType, "filesystem.EventType", [
  { no: 0, name: "EVENT_TYPE_UNSPECIFIED" },
  { no: 1, name: "EVENT_TYPE_CREATE" },
  { no: 2, name: "EVENT_TYPE_WRITE" },
  { no: 3, name: "EVENT_TYPE_REMOVE" },
  { no: 4, name: "EVENT_TYPE_RENAME" },
  { no: 5, name: "EVENT_TYPE_CHMOD" },
]);

/**
 * @generated from message filesystem.MakeDirRequest
 */
export class MakeDirRequest extends Message<MakeDirRequest> {
  /**
   * @generated from field: string path = 1;
   */
  path = "";

  /**
   * @generated from field: permissions.User user = 2;
   */
  user?: User;

  constructor(data?: PartialMessage<MakeDirRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "filesystem.MakeDirRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "path", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "user", kind: "message", T: User },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): MakeDirRequest {
    return new MakeDirRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): MakeDirRequest {
    return new MakeDirRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): MakeDirRequest {
    return new MakeDirRequest().fromJsonString(jsonString, options);
  }

  static equals(a: MakeDirRequest | PlainMessage<MakeDirRequest> | undefined, b: MakeDirRequest | PlainMessage<MakeDirRequest> | undefined): boolean {
    return proto3.util.equals(MakeDirRequest, a, b);
  }
}

/**
 * @generated from message filesystem.MakeDirResponse
 */
export class MakeDirResponse extends Message<MakeDirResponse> {
  constructor(data?: PartialMessage<MakeDirResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "filesystem.MakeDirResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): MakeDirResponse {
    return new MakeDirResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): MakeDirResponse {
    return new MakeDirResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): MakeDirResponse {
    return new MakeDirResponse().fromJsonString(jsonString, options);
  }

  static equals(a: MakeDirResponse | PlainMessage<MakeDirResponse> | undefined, b: MakeDirResponse | PlainMessage<MakeDirResponse> | undefined): boolean {
    return proto3.util.equals(MakeDirResponse, a, b);
  }
}

/**
 * @generated from message filesystem.RemoveRequest
 */
export class RemoveRequest extends Message<RemoveRequest> {
  /**
   * @generated from field: string path = 1;
   */
  path = "";

  /**
   * @generated from field: permissions.User user = 2;
   */
  user?: User;

  constructor(data?: PartialMessage<RemoveRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "filesystem.RemoveRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "path", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "user", kind: "message", T: User },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): RemoveRequest {
    return new RemoveRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): RemoveRequest {
    return new RemoveRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): RemoveRequest {
    return new RemoveRequest().fromJsonString(jsonString, options);
  }

  static equals(a: RemoveRequest | PlainMessage<RemoveRequest> | undefined, b: RemoveRequest | PlainMessage<RemoveRequest> | undefined): boolean {
    return proto3.util.equals(RemoveRequest, a, b);
  }
}

/**
 * @generated from message filesystem.RemoveResponse
 */
export class RemoveResponse extends Message<RemoveResponse> {
  constructor(data?: PartialMessage<RemoveResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "filesystem.RemoveResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): RemoveResponse {
    return new RemoveResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): RemoveResponse {
    return new RemoveResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): RemoveResponse {
    return new RemoveResponse().fromJsonString(jsonString, options);
  }

  static equals(a: RemoveResponse | PlainMessage<RemoveResponse> | undefined, b: RemoveResponse | PlainMessage<RemoveResponse> | undefined): boolean {
    return proto3.util.equals(RemoveResponse, a, b);
  }
}

/**
 * @generated from message filesystem.StatRequest
 */
export class StatRequest extends Message<StatRequest> {
  /**
   * @generated from field: string path = 1;
   */
  path = "";

  /**
   * @generated from field: permissions.User user = 2;
   */
  user?: User;

  constructor(data?: PartialMessage<StatRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "filesystem.StatRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "path", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "user", kind: "message", T: User },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): StatRequest {
    return new StatRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): StatRequest {
    return new StatRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): StatRequest {
    return new StatRequest().fromJsonString(jsonString, options);
  }

  static equals(a: StatRequest | PlainMessage<StatRequest> | undefined, b: StatRequest | PlainMessage<StatRequest> | undefined): boolean {
    return proto3.util.equals(StatRequest, a, b);
  }
}

/**
 * @generated from message filesystem.StatResponse
 */
export class StatResponse extends Message<StatResponse> {
  /**
   * @generated from field: filesystem.EntryInfo entry = 1;
   */
  entry?: EntryInfo;

  constructor(data?: PartialMessage<StatResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "filesystem.StatResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "entry", kind: "message", T: EntryInfo },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): StatResponse {
    return new StatResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): StatResponse {
    return new StatResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): StatResponse {
    return new StatResponse().fromJsonString(jsonString, options);
  }

  static equals(a: StatResponse | PlainMessage<StatResponse> | undefined, b: StatResponse | PlainMessage<StatResponse> | undefined): boolean {
    return proto3.util.equals(StatResponse, a, b);
  }
}

/**
 * @generated from message filesystem.EntryInfo
 */
export class EntryInfo extends Message<EntryInfo> {
  /**
   * @generated from field: string name = 1;
   */
  name = "";

  /**
   * @generated from field: filesystem.FileType type = 2;
   */
  type = FileType.UNSPECIFIED;

  constructor(data?: PartialMessage<EntryInfo>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "filesystem.EntryInfo";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "type", kind: "enum", T: proto3.getEnumType(FileType) },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): EntryInfo {
    return new EntryInfo().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): EntryInfo {
    return new EntryInfo().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): EntryInfo {
    return new EntryInfo().fromJsonString(jsonString, options);
  }

  static equals(a: EntryInfo | PlainMessage<EntryInfo> | undefined, b: EntryInfo | PlainMessage<EntryInfo> | undefined): boolean {
    return proto3.util.equals(EntryInfo, a, b);
  }
}

/**
 * @generated from message filesystem.ListDirRequest
 */
export class ListDirRequest extends Message<ListDirRequest> {
  /**
   * @generated from field: string path = 1;
   */
  path = "";

  /**
   * @generated from field: permissions.User user = 2;
   */
  user?: User;

  constructor(data?: PartialMessage<ListDirRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "filesystem.ListDirRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "path", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "user", kind: "message", T: User },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ListDirRequest {
    return new ListDirRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ListDirRequest {
    return new ListDirRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ListDirRequest {
    return new ListDirRequest().fromJsonString(jsonString, options);
  }

  static equals(a: ListDirRequest | PlainMessage<ListDirRequest> | undefined, b: ListDirRequest | PlainMessage<ListDirRequest> | undefined): boolean {
    return proto3.util.equals(ListDirRequest, a, b);
  }
}

/**
 * @generated from message filesystem.ListDirResponse
 */
export class ListDirResponse extends Message<ListDirResponse> {
  /**
   * @generated from field: repeated filesystem.EntryInfo entries = 1;
   */
  entries: EntryInfo[] = [];

  constructor(data?: PartialMessage<ListDirResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "filesystem.ListDirResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "entries", kind: "message", T: EntryInfo, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ListDirResponse {
    return new ListDirResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ListDirResponse {
    return new ListDirResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ListDirResponse {
    return new ListDirResponse().fromJsonString(jsonString, options);
  }

  static equals(a: ListDirResponse | PlainMessage<ListDirResponse> | undefined, b: ListDirResponse | PlainMessage<ListDirResponse> | undefined): boolean {
    return proto3.util.equals(ListDirResponse, a, b);
  }
}

/**
 * @generated from message filesystem.WatchDirRequest
 */
export class WatchDirRequest extends Message<WatchDirRequest> {
  /**
   * @generated from field: string path = 1;
   */
  path = "";

  /**
   * @generated from field: permissions.User user = 2;
   */
  user?: User;

  constructor(data?: PartialMessage<WatchDirRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "filesystem.WatchDirRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "path", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "user", kind: "message", T: User },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): WatchDirRequest {
    return new WatchDirRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): WatchDirRequest {
    return new WatchDirRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): WatchDirRequest {
    return new WatchDirRequest().fromJsonString(jsonString, options);
  }

  static equals(a: WatchDirRequest | PlainMessage<WatchDirRequest> | undefined, b: WatchDirRequest | PlainMessage<WatchDirRequest> | undefined): boolean {
    return proto3.util.equals(WatchDirRequest, a, b);
  }
}

/**
 * @generated from message filesystem.WatchDirResponse
 */
export class WatchDirResponse extends Message<WatchDirResponse> {
  /**
   * @generated from field: filesystem.FilesystemEvent event = 1;
   */
  event?: FilesystemEvent;

  constructor(data?: PartialMessage<WatchDirResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "filesystem.WatchDirResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "event", kind: "message", T: FilesystemEvent },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): WatchDirResponse {
    return new WatchDirResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): WatchDirResponse {
    return new WatchDirResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): WatchDirResponse {
    return new WatchDirResponse().fromJsonString(jsonString, options);
  }

  static equals(a: WatchDirResponse | PlainMessage<WatchDirResponse> | undefined, b: WatchDirResponse | PlainMessage<WatchDirResponse> | undefined): boolean {
    return proto3.util.equals(WatchDirResponse, a, b);
  }
}

/**
 * @generated from message filesystem.FilesystemEvent
 */
export class FilesystemEvent extends Message<FilesystemEvent> {
  /**
   * @generated from field: string name = 1;
   */
  name = "";

  /**
   * @generated from field: filesystem.EventType type = 2;
   */
  type = EventType.UNSPECIFIED;

  constructor(data?: PartialMessage<FilesystemEvent>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "filesystem.FilesystemEvent";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "type", kind: "enum", T: proto3.getEnumType(EventType) },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): FilesystemEvent {
    return new FilesystemEvent().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): FilesystemEvent {
    return new FilesystemEvent().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): FilesystemEvent {
    return new FilesystemEvent().fromJsonString(jsonString, options);
  }

  static equals(a: FilesystemEvent | PlainMessage<FilesystemEvent> | undefined, b: FilesystemEvent | PlainMessage<FilesystemEvent> | undefined): boolean {
    return proto3.util.equals(FilesystemEvent, a, b);
  }
}

