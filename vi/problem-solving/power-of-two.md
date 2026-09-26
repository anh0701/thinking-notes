# Lũy thừa của 2

## Bài toán

Cho một số nguyên `n`, hãy xác định xem `n` có phải là lũy thừa của 2 hay không.

Một số nguyên dương được coi là lũy thừa của 2 nếu nó có thể được viết dưới dạng:

```text
n = 2^k
```

trong đó `k` là một số nguyên không âm.

Ví dụ:

```text
1  = 2^0  → true
2  = 2^1  → true
4  = 2^2  → true
8  = 2^3  → true
16 = 2^4  → true

3  → false
6  → false
10 → false
```

---

## Cách tiếp cận 1: Chia liên tiếp

Cách tiếp cận đơn giản nhất là chia `n` cho `2` nhiều lần.

Nếu `n` là lũy thừa của 2, việc chia liên tiếp cho `2` cuối cùng sẽ cho kết quả là `1` mà không có số dư.

### Ý tưởng

Ví dụ:

```text
16 → 8 → 4 → 2 → 1
```

Nhưng:

```text
12 → 6 → 3
```

Vì `3` không chia hết cho `2`, nên `12` không phải là lũy thừa của 2.

### Triển khai

```js
function isPowerOfTwo(n) {
if (n <= 0) {
return false; 
}

while (n % 2 === 0) {
n /= 2; 
}

return n === 1;
}
```

### Độ phức tạp

Giả sử `n` là giá trị đầu vào.

Mỗi lần lặp sẽ chia `n` cho `2`, do đó số lần lặp xấp xỉ bằng `log₂(n)`.

```text
Thời gian: O(log n)
Không gian: O(1)
```

### Ưu điểm

* Dễ hiểu.
* Không phụ thuộc vào các phép tính số thực (dấu phẩy động).
* Dựa trực tiếp vào định nghĩa toán học.

### Nhược điểm

* Cần sử dụng vòng lặp.
* Hiệu suất không cao bằng cách tiếp cận sử dụng toán tử bit. ---

## Cách 2: Sử dụng Logarit

Từ phương trình:

```text
n = 2^k
```

ta có thể lấy logarit cơ số 2:

```text
log₂(n) = k
```

Do đó, `n` là lũy thừa của 2 nếu `log₂(n)` là một số nguyên.

### Triển khai

```js
function isPowerOfTwo(n) {
if (n <= 0) {
return false; 
}

const exponent = Math.log2(n); 

return Number.isInteger(exponent);
}
```

### Độ phức tạp

```text
Thời gian: O(1)
Không gian: O(1)
```

### Ưu điểm

* Cách triển khai rất ngắn gọn.
* Không cần sử dụng vòng lặp.
* Tuân theo trực tiếp định nghĩa toán học.

### Nhược điểm

Vấn đề chính nằm ở **độ chính xác của số thực dấu phẩy động (floating-point precision)**.

Các phép tính logarit được thực hiện bằng số học dấu phẩy động, vì vậy việc dựa vào kết quả số nguyên chính xác có thể dẫn đến sai số đối với các giá trị đủ lớn hoặc trong môi trường có độ chính xác số hạn chế.

Do đó, mặc dù cách tiếp cận này rất thanh thoát về mặt toán học, nhưng nhìn chung nó kém ổn định hơn so với giải pháp dựa trên số nguyên.

---

## Cách 3: Thao tác trên bit (Bit Manipulation)

Đây là cách tiếp cận thú vị nhất vì các lũy thừa của 2 có một đặc tính đặc biệt trong hệ nhị phân.

Mỗi lũy thừa dương của 2 chỉ chứa duy nhất **một bit `1`**.

```text
1  = 0001
2  = 0010
4  = 0100
8  = 1000
16 = 10000
```

Bây giờ, hãy xem điều gì xảy ra khi ta trừ đi `1`.

Ví dụ:

```text
8      = 1000
8 - 1  = 0111
```

Bit `1` duy nhất của số `8` chuyển thành `0`, trong khi tất cả các bit bên phải nó đều chuyển thành `1`. Do đó:

```text
1000
0111
----
0000
```

Vậy:

```text
n & (n - 1) === 0
```

chỉ đúng khi `n` có đúng một bit được thiết lập (bit có giá trị 1).

### Triển khai

```js
function isPowerOfTwo(n) {
return n > 0 && (n & (n - 1)) === 0;
}
```

### Ví dụ

Với `8`:

```text
n     = 1000
n - 1 = 0111

1000
0111
----
0000
```

Do đó:

```text
8 & 7 = 0
```

Với `10`:

```text
n     = 1010
n - 1 = 1001

1010
1001
----
1000
```

Do đó:

```text
10 & 9 ≠ 0
```

Vậy `10` không phải là lũy thừa của 2.

### Độ phức tạp

```text
Thời gian: O(1)
Không gian: O(1)
```

### Trường hợp biên quan trọng

`0` cũng thỏa mãn:

```text
0 & (0 - 1) === 0
```

Do đó, điều kiện cần bao gồm:

```js
n > 0
```

Điều kiện đầy đủ là:

```js
n > 0 && (n & (n - 1)) === 0
```

---

## So sánh

| Cách tiếp cận      | Thời gian  | Không gian | Ý tưởng chính                         | Vấn đề cần lưu ý                              |
| ----------------- | ---------: | -----: | ------------------------------------- | -------------------------------------------- |
| Chia liên tiếp    | `O(log n)` | `O(1)` | Chia liên tục cho 2                   | Cần thực hiện vòng lặp                       |
| Logarit           | `O(1)` | `O(1)` | Kiểm tra xem `log₂(n)` có phải số nguyên không |                                              | Độ chính xác số thực dấu phẩy động                     |
| Thao tác bit (Bit Manipulation)  | `O(1)` | `O(1)` | Một lũy thừa của 2 có đúng một bit được bật (bằng 1) | Đòi hỏi hiểu biết về biểu diễn nhị phân |

---

## Tại sao `n & (n - 1)` lại hiệu quả?

Tính chất then chốt là:

> Một lũy thừa dương của 2 có đúng một bit được bật (bằng 1) trong biểu diễn nhị phân của nó.

Ví dụ:

```text
2^0 = 0001
2^1 = 0010
2^2 = 0100
2^3 = 1000
2^4 = 10000
```

Việc trừ đi `1` sẽ chuyển bit `1` duy nhất đó thành `0` và chuyển tất cả các bit nằm bên phải nó thành `1`.

Do đó, hai số này không có bit nào cùng được bật (cùng bằng 1):

```text
n       = 10000
n - 1   = 01111
-----
n & n-1 = 00000
```

Đối với một số không phải là lũy thừa của 2, sẽ có nhiều bit `1`, vì vậy ít nhất một trong số chúng sẽ vẫn còn lại trong kết quả.

---

## Tổng kết

Có nhiều cách để giải cùng một bài toán:

```text
Định nghĩa toán học
↓
Chia liên tiếp
↓
Logarit
↓
Biểu diễn nhị phân
↓
Thao tác bit
```

Cách tiếp cận chia liên tiếp là trực quan nhất vì nó tuân theo trực tiếp định nghĩa về một lũy thừa của 2.

Cách tiếp cận sử dụng logarit tuy ngắn gọn, nhưng độ chính xác của số thực dấu phẩy động khiến nó trở nên kém phù hợp khi yêu cầu tính chính xác tuyệt đối của số nguyên.

Cách tiếp cận sử dụng thao tác bit tận dụng một đặc điểm cấu trúc của các lũy thừa cơ số 2. Phương pháp này đạt độ phức tạp thời gian `O(1)` và tránh được các phép tính trên số thực dấu phẩy động:

```js
n > 0 && (n & (n - 1)) === 0
```

Bài học quan trọng ở đây không chỉ là cách kiểm tra xem một số có phải là lũy thừa của 2 hay không, mà còn là việc nhận ra các đặc tính toán học hoặc nhị phân có thể giúp xây dựng thuật toán đơn giản và hiệu quả hơn.
