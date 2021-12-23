import hashlib
import json


def crypto_hash(*args):
    stringified_args = sorted(
        map(lambda data: json.dumps(data, sort_keys=True), args))

    joined_data = ''.join(stringified_args)

    return hashlib.sha256(joined_data.encode('utf-8')).hexdigest()
