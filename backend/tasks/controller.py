from fastapi import status
from utils import generic_response
from constants import TaskStatuses
from .service import create_task_in_db, fetch_all_tasks_for_a_given_status, update_task_in_db, \
    fetch_single_task_from_id, delete_task_in_db


def create_task(task, creator_id, session):
    errors = create_update_task_validations(task)

    if len(errors) > 0:
        errors_string = "".join(errors)
        return generic_response(
            {"message": f"Please check below errors and fix them \n {errors_string}",
             "status_code": status.HTTP_500_INTERNAL_SERVER_ERROR})

    try:
        task = create_task_in_db(title=task.title, description=task.description, creator_id=creator_id, session=session)
        return generic_response({"data": task, "status_code": status.HTTP_201_CREATED})
    except Exception as e:
        print(e)
        return generic_response(
            {"message": "Something went wrong .. please try again later",
             "status_code": status.HTTP_500_INTERNAL_SERVER_ERROR})


def update_task(task_id, task, creator_id, session):
    errors = create_update_task_validations(task)

    if len(errors) > 0:
        errors_string = "\n".join(errors)
        return generic_response(
            {"message": f"Please check below errors and fix them \n {errors_string}",
             "status_code": status.HTTP_500_INTERNAL_SERVER_ERROR})
    try:
        fetched_task = fetch_single_task_from_id(task_id=task_id, session=session)
        if fetched_task['creator_id'] != creator_id:
            return generic_response(
                {"message": "User not allowed to update this task",
                 "status_code": status.HTTP_401_UNAUTHORIZED})

        if task.status not in TaskStatuses:
            return generic_response(
                {"message": "Invalid status provided", "status_code": status.HTTP_400_BAD_REQUEST})

        updated_task = update_task_in_db(task_id=task_id, title=task.title, description=task.description,
                                         task_status=task.status,
                                         creator_id=creator_id,
                                         session=session)

        return generic_response({"data": updated_task, "status_code": status.HTTP_201_CREATED})
    except Exception as e:
        print(e)
        return generic_response(
            {"message": "Something went wrong .. please try again later",
             "status_code": status.HTTP_500_INTERNAL_SERVER_ERROR})


def delete_task(task_id, creator_id, session):
    try:
        fetched_task = fetch_single_task_from_id(task_id=task_id, session=session)
        if fetched_task['creator_id'] != creator_id:
            return generic_response(
                {"message": "User not allowed to delete this task",
                 "status_code": status.HTTP_401_UNAUTHORIZED})

        deleted_task_success_message = delete_task_in_db(task_id=task_id, session=session)

        return generic_response({"data": deleted_task_success_message, "status_code": status.HTTP_200_OK})
    except Exception as e:
        print(e)
        return generic_response(
            {"message": "Something went wrong .. please try again later",
             "status_code": status.HTTP_500_INTERNAL_SERVER_ERROR})


def fetch_tasks(active_page, creator_id, session, task_status, sort):
    try:
        all_tasks = fetch_all_tasks_for_a_given_status(active_page=active_page,
                                                       creator_id=creator_id,
                                                       session=session, task_status=task_status, sort=sort)

        return generic_response({"data": all_tasks, "status_code": status.HTTP_200_OK})
    except Exception as e:
        print(e)
        return generic_response(
            {"message": "Something went wrong .. please try again later",
             "status_code": status.HTTP_500_INTERNAL_SERVER_ERROR})


def create_update_task_validations(task):
    errors = []
    if len(task.title) < 3 or len(task.title) > 50:
        errors.append("Title must be between 3 characters and 50 characters long\n")
    if len(task.description) < 10 or len(task.description) > 500:
        errors.append("Description must be between 10 characters and 500 characters long\n")
    if task.status not in TaskStatuses:
        errors.append("Status should be To Do, In Progress or Done\n")
    return errors
