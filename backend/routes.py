from fastapi import APIRouter

from auth import auth_router
from tasks import task_router

router = APIRouter(
    prefix="/api/v1",
    responses={404: {"description": "Not found"}},
)

router.include_router(auth_router)
router.include_router(task_router)
