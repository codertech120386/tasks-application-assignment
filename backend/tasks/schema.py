from pydantic import BaseModel


class CreateAndUpdateTaskSchema(BaseModel):
    title: str
    description: str
    status: str

    class Config:
        json_schema_extra = {
            "example": {
                "title": "my first task",
                "description": "first task description",
                "status": "To Do"
            }
        }
