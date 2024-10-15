# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# NO CHECKED-IN PROTOBUF GENCODE
# source: process/process.proto
# Protobuf Python Version: 5.27.3
"""Generated protocol buffer code."""
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import runtime_version as _runtime_version
from google.protobuf import symbol_database as _symbol_database
from google.protobuf.internal import builder as _builder

_runtime_version.ValidateProtobufRuntimeVersion(
    _runtime_version.Domain.PUBLIC, 5, 27, 3, "", "process/process.proto"
)
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()


DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(
    b'\n\x15process/process.proto\x12\x07process"\\\n\x03PTY\x12%\n\x04size\x18\x01 \x01(\x0b\x32\x11.process.PTY.SizeR\x04size\x1a.\n\x04Size\x12\x12\n\x04\x63ols\x18\x01 \x01(\rR\x04\x63ols\x12\x12\n\x04rows\x18\x02 \x01(\rR\x04rows"\xc3\x01\n\rProcessConfig\x12\x10\n\x03\x63md\x18\x01 \x01(\tR\x03\x63md\x12\x12\n\x04\x61rgs\x18\x02 \x03(\tR\x04\x61rgs\x12\x34\n\x04\x65nvs\x18\x03 \x03(\x0b\x32 .process.ProcessConfig.EnvsEntryR\x04\x65nvs\x12\x15\n\x03\x63wd\x18\x04 \x01(\tH\x00R\x03\x63wd\x88\x01\x01\x1a\x37\n\tEnvsEntry\x12\x10\n\x03key\x18\x01 \x01(\tR\x03key\x12\x14\n\x05value\x18\x02 \x01(\tR\x05value:\x02\x38\x01\x42\x06\n\x04_cwd"\r\n\x0bListRequest"n\n\x0bProcessInfo\x12.\n\x06\x63onfig\x18\x01 \x01(\x0b\x32\x16.process.ProcessConfigR\x06\x63onfig\x12\x10\n\x03pid\x18\x02 \x01(\rR\x03pid\x12\x15\n\x03tag\x18\x03 \x01(\tH\x00R\x03tag\x88\x01\x01\x42\x06\n\x04_tag"B\n\x0cListResponse\x12\x32\n\tprocesses\x18\x01 \x03(\x0b\x32\x14.process.ProcessInfoR\tprocesses"\x8c\x01\n\x0cStartRequest\x12\x30\n\x07process\x18\x01 \x01(\x0b\x32\x16.process.ProcessConfigR\x07process\x12#\n\x03pty\x18\x02 \x01(\x0b\x32\x0c.process.PTYH\x00R\x03pty\x88\x01\x01\x12\x15\n\x03tag\x18\x03 \x01(\tH\x01R\x03tag\x88\x01\x01\x42\x06\n\x04_ptyB\x06\n\x04_tag"p\n\rUpdateRequest\x12\x32\n\x07process\x18\x01 \x01(\x0b\x32\x18.process.ProcessSelectorR\x07process\x12#\n\x03pty\x18\x02 \x01(\x0b\x32\x0c.process.PTYH\x00R\x03pty\x88\x01\x01\x42\x06\n\x04_pty"\x10\n\x0eUpdateResponse"\x87\x04\n\x0cProcessEvent\x12\x38\n\x05start\x18\x01 \x01(\x0b\x32 .process.ProcessEvent.StartEventH\x00R\x05start\x12\x35\n\x04\x64\x61ta\x18\x02 \x01(\x0b\x32\x1f.process.ProcessEvent.DataEventH\x00R\x04\x64\x61ta\x12\x32\n\x03\x65nd\x18\x03 \x01(\x0b\x32\x1e.process.ProcessEvent.EndEventH\x00R\x03\x65nd\x12?\n\tkeepalive\x18\x04 \x01(\x0b\x32\x1f.process.ProcessEvent.KeepAliveH\x00R\tkeepalive\x1a\x1e\n\nStartEvent\x12\x10\n\x03pid\x18\x01 \x01(\rR\x03pid\x1a]\n\tDataEvent\x12\x18\n\x06stdout\x18\x01 \x01(\x0cH\x00R\x06stdout\x12\x18\n\x06stderr\x18\x02 \x01(\x0cH\x00R\x06stderr\x12\x12\n\x03pty\x18\x03 \x01(\x0cH\x00R\x03ptyB\x08\n\x06output\x1a|\n\x08\x45ndEvent\x12\x1b\n\texit_code\x18\x01 \x01(\x11R\x08\x65xitCode\x12\x16\n\x06\x65xited\x18\x02 \x01(\x08R\x06\x65xited\x12\x16\n\x06status\x18\x03 \x01(\tR\x06status\x12\x19\n\x05\x65rror\x18\x04 \x01(\tH\x00R\x05\x65rror\x88\x01\x01\x42\x08\n\x06_error\x1a\x0b\n\tKeepAliveB\x07\n\x05\x65vent"<\n\rStartResponse\x12+\n\x05\x65vent\x18\x01 \x01(\x0b\x32\x15.process.ProcessEventR\x05\x65vent">\n\x0f\x43onnectResponse\x12+\n\x05\x65vent\x18\x01 \x01(\x0b\x32\x15.process.ProcessEventR\x05\x65vent"s\n\x10SendInputRequest\x12\x32\n\x07process\x18\x01 \x01(\x0b\x32\x18.process.ProcessSelectorR\x07process\x12+\n\x05input\x18\x02 \x01(\x0b\x32\x15.process.ProcessInputR\x05input"\x13\n\x11SendInputResponse"C\n\x0cProcessInput\x12\x16\n\x05stdin\x18\x01 \x01(\x0cH\x00R\x05stdin\x12\x12\n\x03pty\x18\x02 \x01(\x0cH\x00R\x03ptyB\x07\n\x05input"\xea\x02\n\x12StreamInputRequest\x12>\n\x05start\x18\x01 \x01(\x0b\x32&.process.StreamInputRequest.StartEventH\x00R\x05start\x12;\n\x04\x64\x61ta\x18\x02 \x01(\x0b\x32%.process.StreamInputRequest.DataEventH\x00R\x04\x64\x61ta\x12\x45\n\tkeepalive\x18\x03 \x01(\x0b\x32%.process.StreamInputRequest.KeepAliveH\x00R\tkeepalive\x1a@\n\nStartEvent\x12\x32\n\x07process\x18\x01 \x01(\x0b\x32\x18.process.ProcessSelectorR\x07process\x1a\x38\n\tDataEvent\x12+\n\x05input\x18\x02 \x01(\x0b\x32\x15.process.ProcessInputR\x05input\x1a\x0b\n\tKeepAliveB\x07\n\x05\x65vent"\x15\n\x13StreamInputResponse"p\n\x11SendSignalRequest\x12\x32\n\x07process\x18\x01 \x01(\x0b\x32\x18.process.ProcessSelectorR\x07process\x12\'\n\x06signal\x18\x02 \x01(\x0e\x32\x0f.process.SignalR\x06signal"\x14\n\x12SendSignalResponse"D\n\x0e\x43onnectRequest\x12\x32\n\x07process\x18\x01 \x01(\x0b\x32\x18.process.ProcessSelectorR\x07process"E\n\x0fProcessSelector\x12\x12\n\x03pid\x18\x01 \x01(\rH\x00R\x03pid\x12\x12\n\x03tag\x18\x02 \x01(\tH\x00R\x03tagB\n\n\x08selector*H\n\x06Signal\x12\x16\n\x12SIGNAL_UNSPECIFIED\x10\x00\x12\x12\n\x0eSIGNAL_SIGTERM\x10\x0f\x12\x12\n\x0eSIGNAL_SIGKILL\x10\t2\xca\x03\n\x07Process\x12\x33\n\x04List\x12\x14.process.ListRequest\x1a\x15.process.ListResponse\x12>\n\x07\x43onnect\x12\x17.process.ConnectRequest\x1a\x18.process.ConnectResponse0\x01\x12\x38\n\x05Start\x12\x15.process.StartRequest\x1a\x16.process.StartResponse0\x01\x12\x39\n\x06Update\x12\x16.process.UpdateRequest\x1a\x17.process.UpdateResponse\x12J\n\x0bStreamInput\x12\x1b.process.StreamInputRequest\x1a\x1c.process.StreamInputResponse(\x01\x12\x42\n\tSendInput\x12\x19.process.SendInputRequest\x1a\x1a.process.SendInputResponse\x12\x45\n\nSendSignal\x12\x1a.process.SendSignalRequest\x1a\x1b.process.SendSignalResponseBW\n\x0b\x63om.processB\x0cProcessProtoP\x01\xa2\x02\x03PXX\xaa\x02\x07Process\xca\x02\x07Process\xe2\x02\x13Process\\GPBMetadata\xea\x02\x07Processb\x06proto3'
)

_globals = globals()
_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, _globals)
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, "process.process_pb2", _globals)
if not _descriptor._USE_C_DESCRIPTORS:
    _globals["DESCRIPTOR"]._loaded_options = None
    _globals[
        "DESCRIPTOR"
    ]._serialized_options = b"\n\013com.processB\014ProcessProtoP\001\242\002\003PXX\252\002\007Process\312\002\007Process\342\002\023Process\\GPBMetadata\352\002\007Process"
    _globals["_PROCESSCONFIG_ENVSENTRY"]._loaded_options = None
    _globals["_PROCESSCONFIG_ENVSENTRY"]._serialized_options = b"8\001"
    _globals["_SIGNAL"]._serialized_start = 2316
    _globals["_SIGNAL"]._serialized_end = 2388
    _globals["_PTY"]._serialized_start = 34
    _globals["_PTY"]._serialized_end = 126
    _globals["_PTY_SIZE"]._serialized_start = 80
    _globals["_PTY_SIZE"]._serialized_end = 126
    _globals["_PROCESSCONFIG"]._serialized_start = 129
    _globals["_PROCESSCONFIG"]._serialized_end = 324
    _globals["_PROCESSCONFIG_ENVSENTRY"]._serialized_start = 261
    _globals["_PROCESSCONFIG_ENVSENTRY"]._serialized_end = 316
    _globals["_LISTREQUEST"]._serialized_start = 326
    _globals["_LISTREQUEST"]._serialized_end = 339
    _globals["_PROCESSINFO"]._serialized_start = 341
    _globals["_PROCESSINFO"]._serialized_end = 451
    _globals["_LISTRESPONSE"]._serialized_start = 453
    _globals["_LISTRESPONSE"]._serialized_end = 519
    _globals["_STARTREQUEST"]._serialized_start = 522
    _globals["_STARTREQUEST"]._serialized_end = 662
    _globals["_UPDATEREQUEST"]._serialized_start = 664
    _globals["_UPDATEREQUEST"]._serialized_end = 776
    _globals["_UPDATERESPONSE"]._serialized_start = 778
    _globals["_UPDATERESPONSE"]._serialized_end = 794
    _globals["_PROCESSEVENT"]._serialized_start = 797
    _globals["_PROCESSEVENT"]._serialized_end = 1316
    _globals["_PROCESSEVENT_STARTEVENT"]._serialized_start = 1043
    _globals["_PROCESSEVENT_STARTEVENT"]._serialized_end = 1073
    _globals["_PROCESSEVENT_DATAEVENT"]._serialized_start = 1075
    _globals["_PROCESSEVENT_DATAEVENT"]._serialized_end = 1168
    _globals["_PROCESSEVENT_ENDEVENT"]._serialized_start = 1170
    _globals["_PROCESSEVENT_ENDEVENT"]._serialized_end = 1294
    _globals["_PROCESSEVENT_KEEPALIVE"]._serialized_start = 1296
    _globals["_PROCESSEVENT_KEEPALIVE"]._serialized_end = 1307
    _globals["_STARTRESPONSE"]._serialized_start = 1318
    _globals["_STARTRESPONSE"]._serialized_end = 1378
    _globals["_CONNECTRESPONSE"]._serialized_start = 1380
    _globals["_CONNECTRESPONSE"]._serialized_end = 1442
    _globals["_SENDINPUTREQUEST"]._serialized_start = 1444
    _globals["_SENDINPUTREQUEST"]._serialized_end = 1559
    _globals["_SENDINPUTRESPONSE"]._serialized_start = 1561
    _globals["_SENDINPUTRESPONSE"]._serialized_end = 1580
    _globals["_PROCESSINPUT"]._serialized_start = 1582
    _globals["_PROCESSINPUT"]._serialized_end = 1649
    _globals["_STREAMINPUTREQUEST"]._serialized_start = 1652
    _globals["_STREAMINPUTREQUEST"]._serialized_end = 2014
    _globals["_STREAMINPUTREQUEST_STARTEVENT"]._serialized_start = 1870
    _globals["_STREAMINPUTREQUEST_STARTEVENT"]._serialized_end = 1934
    _globals["_STREAMINPUTREQUEST_DATAEVENT"]._serialized_start = 1936
    _globals["_STREAMINPUTREQUEST_DATAEVENT"]._serialized_end = 1992
    _globals["_STREAMINPUTREQUEST_KEEPALIVE"]._serialized_start = 1296
    _globals["_STREAMINPUTREQUEST_KEEPALIVE"]._serialized_end = 1307
    _globals["_STREAMINPUTRESPONSE"]._serialized_start = 2016
    _globals["_STREAMINPUTRESPONSE"]._serialized_end = 2037
    _globals["_SENDSIGNALREQUEST"]._serialized_start = 2039
    _globals["_SENDSIGNALREQUEST"]._serialized_end = 2151
    _globals["_SENDSIGNALRESPONSE"]._serialized_start = 2153
    _globals["_SENDSIGNALRESPONSE"]._serialized_end = 2173
    _globals["_CONNECTREQUEST"]._serialized_start = 2175
    _globals["_CONNECTREQUEST"]._serialized_end = 2243
    _globals["_PROCESSSELECTOR"]._serialized_start = 2245
    _globals["_PROCESSSELECTOR"]._serialized_end = 2314
    _globals["_PROCESS"]._serialized_start = 2391
    _globals["_PROCESS"]._serialized_end = 2849
# @@protoc_insertion_point(module_scope)
