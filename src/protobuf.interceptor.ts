import {ArgumentMetadata, Injectable, PipeTransform} from "@nestjs/common";
import ProtobufAdapter from "./adapter/protobuf"

@Injectable()
class ProtobufInterceptor implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): any {
        if (value.encryptedData) {
            value = ProtobufAdapter.parse(value.encryptedData)
        }
        console.log(value)
        return value;
    }

}

export default ProtobufInterceptor;
