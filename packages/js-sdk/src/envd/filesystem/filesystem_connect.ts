// @generated by protoc-gen-connect-es v1.4.0 with parameter "target=ts"
// @generated from file filesystem/filesystem.proto (package filesystem, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { CreateWatcherRequest, CreateWatcherResponse, GetWatcherEventsRequest, GetWatcherEventsResponse, ListDirRequest, ListDirResponse, MakeDirRequest, MakeDirResponse, MoveRequest, MoveResponse, RemoveRequest, RemoveResponse, RemoveWatcherRequest, RemoveWatcherResponse, StatRequest, StatResponse, WatchDirRequest, WatchDirResponse } from "./filesystem_pb.js";
import { MethodKind } from "@bufbuild/protobuf";

/**
 * @generated from service filesystem.Filesystem
 */
export const Filesystem = {
  typeName: "filesystem.Filesystem",
  methods: {
    /**
     * @generated from rpc filesystem.Filesystem.Stat
     */
    stat: {
      name: "Stat",
      I: StatRequest,
      O: StatResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc filesystem.Filesystem.MakeDir
     */
    makeDir: {
      name: "MakeDir",
      I: MakeDirRequest,
      O: MakeDirResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc filesystem.Filesystem.Move
     */
    move: {
      name: "Move",
      I: MoveRequest,
      O: MoveResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc filesystem.Filesystem.ListDir
     */
    listDir: {
      name: "ListDir",
      I: ListDirRequest,
      O: ListDirResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc filesystem.Filesystem.Remove
     */
    remove: {
      name: "Remove",
      I: RemoveRequest,
      O: RemoveResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc filesystem.Filesystem.WatchDir
     */
    watchDir: {
      name: "WatchDir",
      I: WatchDirRequest,
      O: WatchDirResponse,
      kind: MethodKind.ServerStreaming,
    },
    /**
     * Non-streaming versions of WatchDir
     *
     * @generated from rpc filesystem.Filesystem.CreateWatcher
     */
    createWatcher: {
      name: "CreateWatcher",
      I: CreateWatcherRequest,
      O: CreateWatcherResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc filesystem.Filesystem.GetWatcherEvents
     */
    getWatcherEvents: {
      name: "GetWatcherEvents",
      I: GetWatcherEventsRequest,
      O: GetWatcherEventsResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc filesystem.Filesystem.RemoveWatcher
     */
    removeWatcher: {
      name: "RemoveWatcher",
      I: RemoveWatcherRequest,
      O: RemoveWatcherResponse,
      kind: MethodKind.Unary,
    },
  }
} as const;

