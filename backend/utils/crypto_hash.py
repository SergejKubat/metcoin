import hashlib
import json


def crypto_hash(*args):
    stringified_args = sorted(map(lambda data: json.dumps(data), args))

    joined_data = ''.join(stringified_args)

    print(f'atempt: {joined_data}\n')

    return hashlib.sha256(joined_data.encode('utf-8')).hexdigest()
