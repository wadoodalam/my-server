# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: users.proto
# Protobuf Python Version: 4.25.0
"""Generated protocol buffer code."""
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import symbol_database as _symbol_database
from google.protobuf.internal import builder as _builder
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()




DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\x0busers.proto\x12\x05users\"\x07\n\x05\x45mpty\"\x1d\n\x0bUserRequest\x12\x0e\n\x06userId\x18\x01 \x01(\t\"3\n\x04User\x12\x0e\n\x06userId\x18\x01 \x01(\t\x12\x0c\n\x04name\x18\x02 \x01(\t\x12\r\n\x05\x65mail\x18\x03 \x01(\t\"&\n\x08UserList\x12\x1a\n\x05users\x18\x01 \x03(\x0b\x32\x0b.users.User\">\n\x07GPSData\x12\x0e\n\x06userId\x18\x01 \x01(\t\x12\x10\n\x08latitude\x18\x02 \x01(\x02\x12\x11\n\tlongitude\x18\x03 \x01(\x02\x32\x9c\x01\n\x0bUserService\x12+\n\x08GetUsers\x12\x0c.users.Empty\x1a\x0f.users.UserList\"\x00\x12\x30\n\x0bGetUserById\x12\x12.users.UserRequest\x1a\x0b.users.User\"\x00\x12.\n\nGetGPSData\x12\x0c.users.Empty\x1a\x0e.users.GPSData\"\x00\x30\x01\x62\x06proto3')

_globals = globals()
_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, _globals)
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'users_pb2', _globals)
if _descriptor._USE_C_DESCRIPTORS == False:
  DESCRIPTOR._options = None
  _globals['_EMPTY']._serialized_start=22
  _globals['_EMPTY']._serialized_end=29
  _globals['_USERREQUEST']._serialized_start=31
  _globals['_USERREQUEST']._serialized_end=60
  _globals['_USER']._serialized_start=62
  _globals['_USER']._serialized_end=113
  _globals['_USERLIST']._serialized_start=115
  _globals['_USERLIST']._serialized_end=153
  _globals['_GPSDATA']._serialized_start=155
  _globals['_GPSDATA']._serialized_end=217
  _globals['_USERSERVICE']._serialized_start=220
  _globals['_USERSERVICE']._serialized_end=376
# @@protoc_insertion_point(module_scope)