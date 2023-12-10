import grpc
import users_pb2
import users_pb2_grpc

def run():
    # Connect to the gRPC server
    channel = grpc.insecure_channel('localhost:50051')
    stub = users_pb2_grpc.UserServiceStub(channel)

    # Call the GetUsers RPC
    users_response = stub.GetUsers(users_pb2.Empty())

    # Print the received users
    print("Received Users:")
    for user in users_response.users:
        print(f"User ID: {user.userId}, Name: {user.name}, Email: {user.email}")

    # Call the GetUserById RPC
    
    user_by_id_response = stub.GetUserById(users_pb2.UserRequest(userId="2"))

    # Print the received user by ID
    print("User by ID:")
    print(f"User ID: {user_by_id_response.userId}, Name: {user_by_id_response.name}, Email: {user_by_id_response.email}")

if __name__ == '__main__':
    run()
