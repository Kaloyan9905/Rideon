class BaseCameraException(Exception):
    """
    Base class exception for camera related errors.
    """
    pass


class GrabFrameException(BaseCameraException):
    """
    Custom exception to indicate a failure to grab a frame.
    """
    pass


class BaseValidatorException(Exception):
    """
    Base exception to indicate a failure to validate pass.
    """
    pass


class FailedToValidatePassException(BaseValidatorException):
    """
    Custom exception to indicate a failure to validate pass.
    """
    pass
