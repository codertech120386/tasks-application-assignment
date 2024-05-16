from fastapi import APIRouter, Depends
from fastapi.security import HTTPBearer

from utils import verify_token
from database import SessionLocal, get_db
from .schema import CreateAndUpdateTaskSchema
from .controller import create_task, fetch_tasks, update_task, delete_task

auth_scheme = HTTPBearer()

task_router = APIRouter(
    prefix="/tasks",
    tags=["Tasks"],
    responses={404: {"description": "Task routes Not found"}},
)


@task_router.post('/')
def add_task(task: CreateAndUpdateTaskSchema, session: SessionLocal = Depends(get_db), token=Depends(auth_scheme),
             user_data=Depends(verify_token)):
    creator_id = user_data['id']
    return create_task(task=task, creator_id=creator_id, session=session)


@task_router.patch('/{task_id}')
def edit_task(task_id: int, task: CreateAndUpdateTaskSchema, session: SessionLocal = Depends(get_db),
              token=Depends(auth_scheme),
              user_data=Depends(verify_token)):
    creator_id = user_data['id']
    return update_task(task_id=task_id, task=task, creator_id=creator_id, session=session)


@task_router.delete('/{task_id}')
def remove_task(task_id: int, session: SessionLocal = Depends(get_db), token=Depends(auth_scheme),
                user_data=Depends(verify_token)):
    creator_id = user_data['id']
    return delete_task(task_id=task_id, creator_id=creator_id, session=session)


@task_router.get('/')
def fetch_all_tasks(page: int = 1, task_status: str = None, sort: str = None, session: SessionLocal = Depends(get_db),
                    token=Depends(auth_scheme),
                    user_data=Depends(verify_token)):
    creator_id = user_data['id']
    return fetch_tasks(active_page=page, creator_id=creator_id, session=session, task_status=task_status, sort=sort)
