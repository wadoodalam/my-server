from concurrent import futures
import grpc
import users_pb2
import users_pb2_grpc
from grpc_reflection.v1alpha import reflection
users = [
    users_pb2.User(userId="1", name="Alice", email="alice@example.com"),
    users_pb2.User(userId="2", name="Bob", email="bob@example.com")
]
class UserService(users_pb2_grpc.UserServiceServicer):
    def GetUsers(self, request, context):
        return users_pb2.UserList(users=users)

    def GetUserById(self, request, context):
            for user in users:
                if user.userId == request.userId:
                    return users_pb2.User(userId=user.userId, name=user.name, email=user.email)
            return users_pb2.User(userId=request.userId, name="", email="")
    
def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    users_pb2_grpc.add_UserServiceServicer_to_server(UserService(), server)
    
    # Add reflection for grpcurl
    SERVICE_NAMES = (
        users_pb2.DESCRIPTOR.services_by_name['UserService'].full_name,
        reflection.SERVICE_NAME,
    )
    reflection.enable_server_reflection(SERVICE_NAMES, server)
    
    server.add_insecure_port('[::]:50051')
    server.start()
    server.wait_for_termination()

if __name__ == '__main__':
    serve()
