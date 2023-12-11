import grpc
import users_pb2
import users_pb2_grpc


def GetAllUsers(stub):
    users_response = stub.GetUsers(users_pb2.Empty())
    print("All Users:")
    for user in users_response.users:
        print(f"User ID: {user.userId}, Name: {user.name}, Email: {user.email}")


def GetSingleUser(stub,user_id):
    user_by_id_response = stub.GetUserById(users_pb2.UserRequest(userId=user_id))
    print("User by ID:")
    print(f"User ID: {user_by_id_response.userId}, Name: {user_by_id_response.name}, Email: {user_by_id_response.email}")

def GetGPS(stub):
    print("Printing GPS Data")
    gps_return_data = stub.GetGPSData(users_pb2.Empty())
    count = 0
    for gps_data in gps_return_data:
        count +=1
        print(f"User ID: {gps_data.userId}, Latitude: {gps_data.latitude}, Longitude: {gps_data.longitude}")
        # just using this logic for visibility purposes as it has even number of users for testing
        # need to be removed if in production
        if count % 2 == 0:
            print("\n")
def run():
    # Connect to the gRPC server
    channel = grpc.insecure_channel('localhost:50051')
    stub = users_pb2_grpc.UserServiceStub(channel)

    GetAllUsers(stub)

    user_id = input("Enter UserID to fetch details: ")
    GetSingleUser(stub,user_id)

    GetGPS(stub)

if __name__ == '__main__':
    run()
