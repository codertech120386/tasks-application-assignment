import math

from fastapi import HTTPException, status
from sqlalchemy import desc, asc

from utils import generic_response
from .models import Task

date_format = "%Y-%m-%d"


def create_task_in_db(title, description, creator_id, session):
    try:
        task = Task(
            title=title,
            description=description,
            creator_id=creator_id,
            status='To Do'
        )

        session.add(task)
        session.commit()
        session.refresh(task)

        created = task.created.strftime(date_format)
        updated = task.updated.strftime(date_format)

        return {'id': task.id, 'title': task.title, 'description': task.description, 'status': task.status,
                'creator_id': creator_id, 'created': created, 'updated': updated}
    except Exception as e:
        print(e)
        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail="Something went wrong .. please try again later.")


def update_task_in_db(task_id, title, description, creator_id, task_status, session):
    try:
        task_query = session.query(Task).filter(Task.id == task_id)
        task = task_query.first()

        if not task:
            return generic_response(
                {"error": True, "message": "Task does not exist", "status_code": status.HTTP_400_BAD_REQUEST})

        task_query.update({
            'title': title,
            'description': description,
            'creator_id': creator_id,
            'status': task_status
        })

        session.commit()
        session.refresh(task)

        created = task.created.strftime(date_format)
        updated = task.updated.strftime(date_format)

        return {'id': task.id, 'title': task.title, 'description': task.description, 'status': task.status,
                'creator_id': task.creator_id, 'created': created, 'updated': updated}
    except Exception as e:
        print(e)
        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail="Something went wrong .. please try again later.")


def delete_task_in_db(task_id, session):
    try:
        task = session.query(Task).filter(Task.id == task_id).first()

        if not task:
            return generic_response(
                {"error": True, "message": "Task does not exist", "status_code": status.HTTP_400_BAD_REQUEST})

        session.delete(task)
        session.commit()

        return {'message': 'Task deleted successfully', 'id': task_id}
    except Exception as e:
        print(e)
        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail="Something went wrong .. please try again later.")


def fetch_all_tasks_for_a_given_status(active_page, creator_id, session, task_status=None, sort=None):
    try:
        tasks_query = session.query(Task)
        limit = 10
        offset = (active_page - 1) * limit
        if task_status == 'All':
            if sort:
                field, sort_order = sort.split(',')
                direction = desc if sort_order == 'desc' else asc
                tasks = tasks_query.filter(Task.creator_id == creator_id).order_by(
                    direction(getattr(Task, field))).offset(offset).limit(limit).all()
            else:
                tasks = tasks_query.filter(Task.creator_id == creator_id).offset(offset).limit(limit).all()
            total_tasks = tasks_query.filter(Task.creator_id == creator_id).count()
        else:
            if sort:
                field, sort_order = sort.split(',')
                direction = desc if sort_order == 'desc' else asc
                tasks = tasks_query.filter(Task.status == task_status).filter(Task.creator_id == creator_id).order_by(
                    direction(getattr(Task, field))).offset(offset).limit(limit).all()
            else:
                tasks = tasks_query.filter(Task.status == task_status).filter(Task.creator_id == creator_id).offset(
                    offset).limit(limit).all()
            total_tasks = tasks_query.filter(Task.status == task_status).filter(Task.creator_id == creator_id).count()
        total_pages = math.ceil(total_tasks / limit)
        response = {'totalPages': total_pages, 'activePage': active_page, 'tasks': []}
        for task in tasks:
            created = task.created.strftime(date_format)
            updated = task.updated.strftime(date_format)

            row = {'id': task.id, 'title': task.title, 'description': task.description, 'status': task.status,
                   'created': created, 'updated': updated}
            response['tasks'].append(row)
        return response
    except Exception as e:
        print(e)
        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail="Something went wrong .. please try again later.")


def fetch_single_task_from_id(task_id, session):
    try:
        task = session.query(Task).filter(Task.id == task_id).first()
    except Exception as e:
        print(e)
        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail="Something went wrong .. please try again later.")
    if not task:
        return generic_response(
            {"error": True, "message": "Task does not exist", "status_code": status.HTTP_400_BAD_REQUEST})

    return {'id': task.id, 'title': task.title, 'description': task.description, 'status': task.status,
            'creator_id': task.creator_id, 'created': task.created, 'updated': task.updated}
