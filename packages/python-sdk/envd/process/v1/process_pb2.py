# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: envd/process/v1/process.proto
# Protobuf Python Version: 5.26.1
"""Generated protocol buffer code."""
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import symbol_database as _symbol_database
from google.protobuf.internal import builder as _builder
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()


from envd.permissions.v1 import permissions_pb2 as envd_dot_permissions_dot_v1_dot_permissions__pb2


DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\x1d\x65nvd/process/v1/process.proto\x12\x0f\x65nvd.process.v1\x1a%envd/permissions/v1/permissions.proto\"d\n\x03PTY\x12-\n\x04size\x18\x01 \x01(\x0b\x32\x19.envd.process.v1.PTY.SizeR\x04size\x1a.\n\x04Size\x12\x12\n\x04\x63ols\x18\x01 \x01(\rR\x04\x63ols\x12\x12\n\x04rows\x18\x02 \x01(\rR\x04rows\"\xbe\x01\n\rProcessConfig\x12\x10\n\x03\x63md\x18\x01 \x01(\tR\x03\x63md\x12\x12\n\x04\x61rgs\x18\x02 \x03(\tR\x04\x61rgs\x12<\n\x04\x65nvs\x18\x03 \x03(\x0b\x32(.envd.process.v1.ProcessConfig.EnvsEntryR\x04\x65nvs\x12\x10\n\x03\x63wd\x18\x04 \x01(\tR\x03\x63wd\x1a\x37\n\tEnvsEntry\x12\x10\n\x03key\x18\x01 \x01(\tR\x03key\x12\x14\n\x05value\x18\x02 \x01(\tR\x05value:\x02\x38\x01\"\x16\n\x14ListProcessesRequest\"U\n\x15ListProcessesResponse\x12<\n\tprocesses\x18\x01 \x03(\x0b\x32\x1e.envd.process.v1.ProcessConfigR\tprocesses\"\xbc\x01\n\x13StartProcessRequest\x12\x38\n\x07process\x18\x01 \x01(\x0b\x32\x1e.envd.process.v1.ProcessConfigR\x07process\x12+\n\x03pty\x18\x02 \x01(\x0b\x32\x14.envd.process.v1.PTYH\x00R\x03pty\x88\x01\x01\x12\x36\n\x05owner\x18\x03 \x01(\x0b\x32 .envd.permissions.v1.CredentialsR\x05ownerB\x06\n\x04_pty\"\x87\x01\n\x14UpdateProcessRequest\x12:\n\x07process\x18\x01 \x01(\x0b\x32 .envd.process.v1.ProcessSelectorR\x07process\x12+\n\x03pty\x18\x02 \x01(\x0b\x32\x14.envd.process.v1.PTYH\x00R\x03pty\x88\x01\x01\x42\x06\n\x04_pty\"\x17\n\x15UpdateProcessResponse\"\xc6\x03\n\x0cProcessEvent\x12@\n\x05start\x18\x01 \x01(\x0b\x32(.envd.process.v1.ProcessEvent.StartEventH\x00R\x05start\x12=\n\x04\x64\x61ta\x18\x02 \x01(\x0b\x32\'.envd.process.v1.ProcessEvent.DataEventH\x00R\x04\x64\x61ta\x12:\n\x03\x65nd\x18\x03 \x01(\x0b\x32&.envd.process.v1.ProcessEvent.EndEventH\x00R\x03\x65nd\x1a\x1e\n\nStartEvent\x12\x10\n\x03pid\x18\x01 \x01(\rR\x03pid\x1aI\n\tDataEvent\x12\x18\n\x06stdout\x18\x01 \x01(\x0cH\x00R\x06stdout\x12\x18\n\x06stderr\x18\x02 \x01(\x0cH\x00R\x06stderrB\x08\n\x06output\x1a\x84\x01\n\x08\x45ndEvent\x12\x1b\n\texit_code\x18\x01 \x01(\x11R\x08\x65xitCode\x12\x1e\n\nterminated\x18\x02 \x01(\x08R\nterminated\x12\x16\n\x06status\x18\x03 \x01(\tR\x06status\x12\x19\n\x05\x65rror\x18\x04 \x01(\tH\x00R\x05\x65rror\x88\x01\x01\x42\x08\n\x06_errorB\x07\n\x05\x65vent\"K\n\x14StartProcessResponse\x12\x33\n\x05\x65vent\x18\x01 \x01(\x0b\x32\x1d.envd.process.v1.ProcessEventR\x05\x65vent\"O\n\x18ReconnectProcessResponse\x12\x33\n\x05\x65vent\x18\x01 \x01(\x0b\x32\x1d.envd.process.v1.ProcessEventR\x05\x65vent\"\x8a\x01\n\x17SendProcessInputRequest\x12:\n\x07process\x18\x01 \x01(\x0b\x32 .envd.process.v1.ProcessSelectorR\x07process\x12\x33\n\x05input\x18\x02 \x01(\x0b\x32\x1d.envd.process.v1.ProcessInputR\x05input\"\x1a\n\x18SendProcessInputResponse\"C\n\x0cProcessInput\x12\x16\n\x05stdin\x18\x01 \x01(\x0cH\x00R\x05stdin\x12\x12\n\x03tty\x18\x02 \x01(\x0cH\x00R\x03ttyB\x07\n\x05input\"\xd7\x02\n\x1dSendProcessInputStreamRequest\x12Q\n\x05start\x18\x01 \x01(\x0b\x32\x39.envd.process.v1.SendProcessInputStreamRequest.StartEventH\x00R\x05start\x12N\n\x04\x64\x61ta\x18\x02 \x01(\x0b\x32\x38.envd.process.v1.SendProcessInputStreamRequest.DataEventH\x00R\x04\x64\x61ta\x1aH\n\nStartEvent\x12:\n\x07process\x18\x01 \x01(\x0b\x32 .envd.process.v1.ProcessSelectorR\x07process\x1a@\n\tDataEvent\x12\x33\n\x05input\x18\x02 \x01(\x0b\x32\x1d.envd.process.v1.ProcessInputR\x05inputB\x07\n\x05\x65vent\" \n\x1eSendProcessInputStreamResponse\"\x87\x01\n\x18SendProcessSignalRequest\x12:\n\x07process\x18\x01 \x01(\x0b\x32 .envd.process.v1.ProcessSelectorR\x07process\x12/\n\x06signal\x18\x02 \x01(\x0e\x32\x17.envd.process.v1.SignalR\x06signal\"\x1b\n\x19SendProcessSignalResponse\"U\n\x17ReconnectProcessRequest\x12:\n\x07process\x18\x01 \x01(\x0b\x32 .envd.process.v1.ProcessSelectorR\x07process\"1\n\x0fProcessSelector\x12\x12\n\x03pid\x18\x01 \x01(\rH\x00R\x03pidB\n\n\x08selector*H\n\x06Signal\x12\x16\n\x12SIGNAL_UNSPECIFIED\x10\x00\x12\x12\n\x0eSIGNAL_SIGTERM\x10\x0f\x12\x12\n\x0eSIGNAL_SIGKILL\x10\t2\xec\x05\n\x0eProcessService\x12^\n\rListProcesses\x12%.envd.process.v1.ListProcessesRequest\x1a&.envd.process.v1.ListProcessesResponse\x12i\n\x10ReconnectProcess\x12(.envd.process.v1.ReconnectProcessRequest\x1a).envd.process.v1.ReconnectProcessResponse0\x01\x12]\n\x0cStartProcess\x12$.envd.process.v1.StartProcessRequest\x1a%.envd.process.v1.StartProcessResponse0\x01\x12^\n\rUpdateProcess\x12%.envd.process.v1.UpdateProcessRequest\x1a&.envd.process.v1.UpdateProcessResponse\x12{\n\x16SendProcessInputStream\x12..envd.process.v1.SendProcessInputStreamRequest\x1a/.envd.process.v1.SendProcessInputStreamResponse(\x01\x12g\n\x10SendProcessInput\x12(.envd.process.v1.SendProcessInputRequest\x1a).envd.process.v1.SendProcessInputResponse\x12j\n\x11SendProcessSignal\x12).envd.process.v1.SendProcessSignalRequest\x1a*.envd.process.v1.SendProcessSignalResponseB\x81\x01\n\x13\x63om.envd.process.v1B\x0cProcessProtoP\x01\xa2\x02\x03\x45PX\xaa\x02\x0f\x45nvd.Process.V1\xca\x02\x0f\x45nvd\\Process\\V1\xe2\x02\x1b\x45nvd\\Process\\V1\\GPBMetadata\xea\x02\x11\x45nvd::Process::V1b\x06proto3')

_globals = globals()
_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, _globals)
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'envd.process.v1.process_pb2', _globals)
if not _descriptor._USE_C_DESCRIPTORS:
  _globals['DESCRIPTOR']._loaded_options = None
  _globals['DESCRIPTOR']._serialized_options = b'\n\023com.envd.process.v1B\014ProcessProtoP\001\242\002\003EPX\252\002\017Envd.Process.V1\312\002\017Envd\\Process\\V1\342\002\033Envd\\Process\\V1\\GPBMetadata\352\002\021Envd::Process::V1'
  _globals['_PROCESSCONFIG_ENVSENTRY']._loaded_options = None
  _globals['_PROCESSCONFIG_ENVSENTRY']._serialized_options = b'8\001'
  _globals['_SIGNAL']._serialized_start=2387
  _globals['_SIGNAL']._serialized_end=2459
  _globals['_PTY']._serialized_start=89
  _globals['_PTY']._serialized_end=189
  _globals['_PTY_SIZE']._serialized_start=143
  _globals['_PTY_SIZE']._serialized_end=189
  _globals['_PROCESSCONFIG']._serialized_start=192
  _globals['_PROCESSCONFIG']._serialized_end=382
  _globals['_PROCESSCONFIG_ENVSENTRY']._serialized_start=327
  _globals['_PROCESSCONFIG_ENVSENTRY']._serialized_end=382
  _globals['_LISTPROCESSESREQUEST']._serialized_start=384
  _globals['_LISTPROCESSESREQUEST']._serialized_end=406
  _globals['_LISTPROCESSESRESPONSE']._serialized_start=408
  _globals['_LISTPROCESSESRESPONSE']._serialized_end=493
  _globals['_STARTPROCESSREQUEST']._serialized_start=496
  _globals['_STARTPROCESSREQUEST']._serialized_end=684
  _globals['_UPDATEPROCESSREQUEST']._serialized_start=687
  _globals['_UPDATEPROCESSREQUEST']._serialized_end=822
  _globals['_UPDATEPROCESSRESPONSE']._serialized_start=824
  _globals['_UPDATEPROCESSRESPONSE']._serialized_end=847
  _globals['_PROCESSEVENT']._serialized_start=850
  _globals['_PROCESSEVENT']._serialized_end=1304
  _globals['_PROCESSEVENT_STARTEVENT']._serialized_start=1055
  _globals['_PROCESSEVENT_STARTEVENT']._serialized_end=1085
  _globals['_PROCESSEVENT_DATAEVENT']._serialized_start=1087
  _globals['_PROCESSEVENT_DATAEVENT']._serialized_end=1160
  _globals['_PROCESSEVENT_ENDEVENT']._serialized_start=1163
  _globals['_PROCESSEVENT_ENDEVENT']._serialized_end=1295
  _globals['_STARTPROCESSRESPONSE']._serialized_start=1306
  _globals['_STARTPROCESSRESPONSE']._serialized_end=1381
  _globals['_RECONNECTPROCESSRESPONSE']._serialized_start=1383
  _globals['_RECONNECTPROCESSRESPONSE']._serialized_end=1462
  _globals['_SENDPROCESSINPUTREQUEST']._serialized_start=1465
  _globals['_SENDPROCESSINPUTREQUEST']._serialized_end=1603
  _globals['_SENDPROCESSINPUTRESPONSE']._serialized_start=1605
  _globals['_SENDPROCESSINPUTRESPONSE']._serialized_end=1631
  _globals['_PROCESSINPUT']._serialized_start=1633
  _globals['_PROCESSINPUT']._serialized_end=1700
  _globals['_SENDPROCESSINPUTSTREAMREQUEST']._serialized_start=1703
  _globals['_SENDPROCESSINPUTSTREAMREQUEST']._serialized_end=2046
  _globals['_SENDPROCESSINPUTSTREAMREQUEST_STARTEVENT']._serialized_start=1899
  _globals['_SENDPROCESSINPUTSTREAMREQUEST_STARTEVENT']._serialized_end=1971
  _globals['_SENDPROCESSINPUTSTREAMREQUEST_DATAEVENT']._serialized_start=1973
  _globals['_SENDPROCESSINPUTSTREAMREQUEST_DATAEVENT']._serialized_end=2037
  _globals['_SENDPROCESSINPUTSTREAMRESPONSE']._serialized_start=2048
  _globals['_SENDPROCESSINPUTSTREAMRESPONSE']._serialized_end=2080
  _globals['_SENDPROCESSSIGNALREQUEST']._serialized_start=2083
  _globals['_SENDPROCESSSIGNALREQUEST']._serialized_end=2218
  _globals['_SENDPROCESSSIGNALRESPONSE']._serialized_start=2220
  _globals['_SENDPROCESSSIGNALRESPONSE']._serialized_end=2247
  _globals['_RECONNECTPROCESSREQUEST']._serialized_start=2249
  _globals['_RECONNECTPROCESSREQUEST']._serialized_end=2334
  _globals['_PROCESSSELECTOR']._serialized_start=2336
  _globals['_PROCESSSELECTOR']._serialized_end=2385
  _globals['_PROCESSSERVICE']._serialized_start=2462
  _globals['_PROCESSSERVICE']._serialized_end=3210
# @@protoc_insertion_point(module_scope)
