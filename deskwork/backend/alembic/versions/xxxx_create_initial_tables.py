"""create initial tables"""

from alembic import op
import sqlalchemy as sa


revision = 'xxxxxxxx'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "users",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("username", sa.String(64), unique=True, nullable=False),
        sa.Column("email", sa.String(128), unique=True, nullable=False),
        sa.Column("password_hash", sa.String(256), nullable=False),
    )
    op.create_table(
        "user_progress",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("user_id", sa.Integer, sa.ForeignKey("users.id"), nullable=False),
        sa.Column("mission_id", sa.Integer, nullable=False),
        sa.Column("stage", sa.SmallInteger, default=0, nullable=False),
        sa.Column("xp", sa.Integer, default=0, nullable=False),
    )


def downgrade():
    op.drop_table("user_progress")
    op.drop_table("users")

