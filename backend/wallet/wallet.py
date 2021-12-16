import uuid
import json

from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives.asymmetric import ec
from cryptography.hazmat.primitives.asymmetric.utils import (
    encode_dss_signature,
    decode_dss_signature
)
from cryptography.hazmat.primitives import hashes, serialization
from cryptography.exceptions import InvalidSignature


class Wallet:
    def __init__(self):
        self.address = str(uuid.uuid4())[0:8]
        self.balance = 1000
        self.private_key = ec.generate_private_key(
            ec.SECP256K1(),
            default_backend()
        )
        self.public_key = self.private_key.public_key()
        self.serialize_public_key()

    def sign(self, data):
        return decode_dss_signature(self.private_key.sign(
            json.dumps(data).encode('utf-8'),
            ec.ECDSA(hashes.SHA256())))

    def serialize_public_key(self):
        self.public_key_bytes = self.public_key.public_bytes(
            encoding=serialization.Encoding.PEM,
            format=serialization.PublicFormat.SubjectPublicKeyInfo
        )

        decoded_public_key = self.public_key_bytes.decode('utf-8')

        self.public_key = decoded_public_key

    @staticmethod
    def verify(public_key, data, signature):
        deserialized_public_key = serialization.load_pem_public_key(
            public_key.encode('utf-8'),
            default_backend
        )

        (r, s) = signature

        try:
            deserialized_public_key.verify(
                encode_dss_signature(r, s),
                json.dumps(data).encode('utf-8'),
                ec.ECDSA(hashes.SHA256()))
            return True
        except InvalidSignature:
            return False


def main():
    wallet = Wallet()
    print(f'Wallet: {wallet.__dict__}')


if __name__ == '__main__':
    main()
