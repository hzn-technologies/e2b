# coding: utf-8

"""
    Devbook

    Devbook API

    The version of the OpenAPI document: 1.0.0
    Generated by OpenAPI Generator (https://openapi-generator.tech)

    Do not edit the class manually.
"""  # noqa: E501


from __future__ import annotations
import pprint
import re  # noqa: F401
import json


from typing import Optional
from pydantic import BaseModel, Field, StrictStr


class NewEnvironment(BaseModel):
    """
    NewEnvironment
    """

    title: Optional[StrictStr] = None
    template: StrictStr = Field(...)

    """Pydantic configuration"""

    class Config:
        allow_population_by_field_name = True
        validate_assignment = True

    def to_str(self) -> str:
        """Returns the string representation of the model using alias"""
        return pprint.pformat(self.dict(by_alias=True))

    def to_json(self) -> str:
        """Returns the JSON representation of the model using alias"""
        return json.dumps(self.to_dict())

    @classmethod
    def from_json(cls, json_str: str) -> NewEnvironment:
        """Create an instance of NewEnvironment from a JSON string"""
        return cls.from_dict(json.loads(json_str))

    def to_dict(self):
        """Returns the dictionary representation of the model using alias"""
        _dict = self.dict(by_alias=True, exclude={}, exclude_none=True)
        return _dict

    @classmethod
    def from_dict(cls, obj: dict) -> NewEnvironment:
        """Create an instance of NewEnvironment from a dict"""
        if obj is None:
            return None

        if not isinstance(obj, dict):
            return NewEnvironment.parse_obj(obj)

        # raise errors for additional fields in the input
        for _key in obj.keys():
            if _key not in ["title", "template"]:
                raise ValueError(
                    "Error due to additional fields (not defined in NewEnvironment) in the input: "
                    + obj
                )

        _obj = NewEnvironment.parse_obj(
            {"title": obj.get("title"), "template": obj.get("template")}
        )
        return _obj
