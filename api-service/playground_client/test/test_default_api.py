# coding: utf-8

"""
    playground

    No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)  # noqa: E501

    The version of the OpenAPI document: 1.0.0
    Generated by: https://openapi-generator.tech
"""


from __future__ import absolute_import

import unittest

import playground_client
from playground_client.api.default_api import DefaultApi  # noqa: E501
from playground_client.rest import ApiException


class TestDefaultApi(unittest.TestCase):
    """DefaultApi unit test stubs"""

    def setUp(self):
        self.api = playground_client.api.default_api.DefaultApi()  # noqa: E501

    def tearDown(self):
        pass

    def test_create_sessions(self):
        """Test case for create_sessions

        """
        pass

    def test_delete_filesystem_entry(self):
        """Test case for delete_filesystem_entry

        """
        pass

    def test_delete_session(self):
        """Test case for delete_session

        """
        pass

    def test_get_process(self):
        """Test case for get_process

        """
        pass

    def test_get_session(self):
        """Test case for get_session

        """
        pass

    def test_list_filesystem_dir(self):
        """Test case for list_filesystem_dir

        """
        pass

    def test_make_filesystem_dir(self):
        """Test case for make_filesystem_dir

        """
        pass

    def test_read_filesystem_file(self):
        """Test case for read_filesystem_file

        """
        pass

    def test_start_process(self):
        """Test case for start_process

        """
        pass

    def test_stop_process(self):
        """Test case for stop_process

        """
        pass

    def test_wait_for_log_output(self):
        """Test case for wait_for_log_output

        """
        pass

    def test_write_filesystem_file(self):
        """Test case for write_filesystem_file

        """
        pass

    def test_write_process_stdin(self):
        """Test case for write_process_stdin

        """
        pass


if __name__ == '__main__':
    unittest.main()
