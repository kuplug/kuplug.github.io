<?php
session_start();
date_default_timezone_set('Asia/Jakarta');
ini_set('display_errors', 1);
error_reporting(E_ALL);
header('Content-type: text/html; charset=utf-8');
$e = json_decode(file_get_contents('php://input'), true);

class ktupad extends koneksi {
public $conf1=array(
'baseURL' => 'http://localhost/op/',
'isAkses'   => 0,
'uid'       => 0,
'token'     => 0,
'tb'        => 'master_akses',
'mn'        => 'akses',
'data'      => '{"id":"7","nama":"bismillah"}',
'sql'       => '',
'cond'      => '',
'cond1'     => '',
'conds'     => '',
'sortir'    => 'ORDER BY id DESC',
'limit'     => 100,
'offset'    => 0,
'filetype'  => 'images/*',
'filedir'   => 'files/'
);

function init(){
$r=$_REQUEST;
if(isset($r['t'])){ $this->conf2['tb']=$r['t'];}
$e = json_decode(file_get_contents('php://input'), true);
if(isset($e['t'])){ $this->conf2['tb']=$e['t']; }
$this->conf=array_merge($this->conf1,$this->conf2);
if(isset($r)){
foreach ($r as $key=>$val) {
$this->conf[$key]=$val;
$inj = array(" or'"," or ");
$str = $val;
if (str_replace($inj, '', $str) != $str) {  $this->conf[$key]=''; }
}
}
if(isset($r['mod'])){ $func=$r['mod'];	$this->$func();}
else {
if(isset($e)){ foreach ($e as $key=>$val) {
// $this->$key=$val;
// $this->datas[$key]=$val;
$this->conf[$key]=$val;
$inj = array(" or'"," or ");
$str = $val;
if (str_replace($inj, '', $str) != $str) {  $this->conf[$key]='ktupad'; }
// else {  $this->conf[$key]=$val;}
}	}
if(isset($e['mod'])){ $func=$e['mod'];	$this->$func();}
else { $out=array('Info'=>'Hello Donat'); echo json_encode($out);  }
}
}

public function token(){
$d=$this->conf;
$token=$d['token'];
// $token=1;
$sql = "SELECT * FROM master_users where token='$token'";
$conn=$this->connect();
$result = $conn->query($sql);
$row = $result->fetch();
if($row){$uid=$row['id'];$aid=$row['akses'];} else {
$uid=0;
$aid=0; }
$out=array(
'akses'=>$aid,
'uid'=>$uid,
'aid'=>$aid);
return $out;
// $conn->close();
$conn=null;
}

public function createToken(){
$conn=$this->connect();
$conn->query("SET SESSION sql_mode = ''");
$sql = "UPDATE master_users SET token= md5(rand()) where email=email";
$result = $conn->query($sql);
echo $sql;
}
public function akses(){
$d=$this->conf;
if(!$d['isAkses']){ $crud=array("c","r","u","d"); }
else{
$token=$this->token();
$akses=$token['akses'];
$mn=$d['mn'];
$conn=$this->connect();
$result =$conn->query("select id from master_menu where nama='$mn'");
$row = $result->fetch();
$mnid=$row[0];
$result = $conn->query("SELECT c,r,u,d FROM master_akses WHERE nama='$akses'");
$row = $result->fetch();
$isc=explode(",",$row['c']);
$isr=explode(",",$row['r']);
$isu=explode(",",$row['u']);
$isd=explode(",",$row['d']);
$crud=array();
if(in_array($mnid, $isc)) { array_push($crud, 'c'); }
if(in_array($mnid, $isr)) { array_push($crud, 'r'); }
if(in_array($mnid, $isu)) { array_push($crud, 'u'); }
if(in_array($mnid, $isd)) { array_push($crud, 'd'); }
}
return $crud;
// return $isd;
// $conn->close();
$conn=null;
}
function upload(){
$d=$this->conf;
$tb=$d['tb'];
$conn=$this->connect();
$csv = file_get_contents($_FILES['afile']['tmp_name']);
$row = str_getcsv($csv, "\n");
$row[0] = preg_replace('/[\x00-\x1F\x80-\xFF]/', '', $row[0]);
$header = str_getcsv($row[0], ";");
$data = array();
for ($n = 1; $n < count($row); $n++) {
$data = str_getcsv($row[$n], ";");
$datasecs = array();
for ($i = 0; $i < count($data); $i++) {
$datasecs[] = $header[$i] . "='" . $data[$i] . "'";
$datas = implode(",", $datasecs);
}
$sql = "INSERT INTO $tb set $datas";
$result = $conn->query($sql);
// echo $sql;
}
// $conn->close();
$conn=null;
// $out=$this->sql('r','Table',$sql);
$out=array('Info'=>'Hello Donat','SQL'=>$sql);
echo json_encode($out);
}
public function sql($crud,$act,$sql){
// echo $sql;
$tAkses=$this->akses();
$conn=$this->connect();
$conn->query("SET SESSION sql_mode = ''");
if(in_array($crud, $tAkses)) {
// $result = $conn->query($sql);
$result = $conn->prepare($sql);
$result->execute();
$result->setFetchMode(PDO::FETCH_ASSOC);
$col=array();
$data=array();
$arr = array("Read", "Table");
if(in_array ($act,$arr)){
$data=array();
$colcount = $result->columnCount();
for ($i = 0; $i < $colcount; $i++) {  $cols = $result->getColumnMeta($i);
$col[] = $cols['name'];
}
while($row = $result->fetch()) { $data[] = $row; }
}
// $sql='SQL';
$out=array('sql'=>$sql,'info'=>'Berhasil '.$act,'fld'=>$col,'data'=>$data,'akses'=>$tAkses );
}
else {
// $sql='SQL';
$out=array('sql'=>$sql,'info'=>'Gagal '.$act,'akses'=>$tAkses );}
return $out;
$conn=null;
}
public function cari(){
$d=$this->conf;
$d['cond']=rawurldecode($d['cond']);
$sql="SELECT * FROM $d[tb] WHERE id IN (SELECT id FROM $d[tb] $d[conds]) $d[cond1] $d[cond] $d[sortir] LIMIT $d[offset], $d[limit]";
$out=$this->sql('r','Table',$sql);
echo json_encode($out);
}

public function getData($sql){
$conn=$this->connect();
$conn->query("SET SESSION sql_mode = ''");
$result = $conn->query($sql);
$data=array();
$result->setFetchMode(PDO::FETCH_ASSOC);
while($row = $result->fetch()) { $data[] = $row; }
return $data;
}

public function getRS($sql){
$conn=$this->connect();
$result = $conn->query($sql);
$result->setFetchMode(PDO::FETCH_ASSOC);
$row = $result->fetch();
return $row;
}



public function create(){
$d=$this->conf;
$data=$d['data'];
foreach($data as $key => $val) { $obj[]=$key.'="'.$val.'"'; }
$row = implode(',',$obj);
$sql="INSERT INTO $d[tb] SET $row";
$out=$this->sql('c','Create',$sql);
$out['sql']=$sql;
echo json_encode($out);
}
// end create

public function read(){
$d=$this->conf;
$sql = "SELECT * FROM $d[tb] WHERE id=$d[id]";
$out=$this->sql('r','Read',$sql);
echo json_encode($out);
}
// end read
public function update(){
$d=$this->conf;
$data=$d['data'];
foreach($data as $key => $val) { $obj[]=$key."='".$val."'"; }
$row = implode(',',$obj);
$sql = "UPDATE $d[tb] SET $row WHERE id=$d[id]";
$out=$this->sql('u','Update',$sql);
$out['sql']=$sql;

echo json_encode($out);
}
// end update
public function delete(){
$d=$this->conf;
$sql="DELETE FROM $d[tb] WHERE id IN ($d[id])";
$out=$this->sql('d','Delete',$sql);
echo json_encode($out);
}
// end delete
public function table(){
$d=$this->conf;
// $d['cond']=rawurldecode($d['cond']);
// $d['menu']='Setting';
// $sql="SELECT tb FROM master_menu WHERE nama='$d[nama]'";
// $ro = $this->getRS($sql);


 // $sql="SELECT * FROM {$ro['tb']}  WHERE id IN (SELECT id FROM {$ro['tb']} $d[conds]) $d[cond1] $d[cond] $d[sortir] LIMIT $d[offset], $d[limit]";
$sql="SELECT * FROM $d[tb] WHERE id IN (SELECT id FROM $d[tb] $d[conds]) $d[cond1] $d[cond] $d[sortir] LIMIT $d[offset], $d[limit]";
 $out=$this->sql('r','Table',$sql);

// $result = $conn->query($sql);
// $out['tipe']=$ro['tipe'];
$out['sql']=$sql;
// $out['ro']=$ro;
// $out['tb']=$ro['tb'];
// $out['nama']=$d['nama'];

echo json_encode($out);
// echo $sql;
}


public function tableP(){
$d=$this->conf;
$token=$d['token'];
$conn=$this->connect();
// $sql="select id,email,(select id from master_akses where nama = a.akses ) as akses from master_users a where token='$token' ";
$sql="select id,email,(select id from master_akses where nama = a.akses ) as akses from master_users a where token='$token' ";
$result = $conn->query($sql);
$result->setFetchMode(PDO::FETCH_ASSOC);
$row = $result->fetch();
$nama=$row['email'];
$akses=$row['akses'];
// echo 'induk:'.  $induk;
$induk=$row['id'];
$sql="
select id from (select * from master_akses order by induk, id) a,
(select @pv := '$akses') b
where   find_in_set(induk, @pv) and length(@pv := concat(@pv, ',', id))
";
$result = $conn->query($sql);
$data=array();
$result->setFetchMode(PDO::FETCH_ASSOC);
while($row = $result->fetch()) { $data[] = $row['id']; }
$id= implode(",",$data);
if($id){
$sql="
select id, akses from master_users where akses in (select nama from master_akses where id in ($id));
";
$result = $conn->query($sql);
$data=array();
$result->setFetchMode(PDO::FETCH_ASSOC);
while($row = $result->fetch()) { $data[] = $row['id']; }
$id= implode(",",$data);
// echo 'induk:'.$induk;
// echo 'data:'.$data;
// echo 'id:'.$id;
if(!$id){ $id=$induk; // echo 'induk:'.$induk;
}
$nah="select id from  $d[tb] where induk in ($id) or induk='$induk'"; }
// $nah="select id from  $d[tb] where induk in ($id)"; }
else { $nah="select id from  $d[tb] where induk= '$induk'"; }
$sql="SELECT * FROM $d[tb] WHERE id IN ($nah)  $d[cond1] $d[cond] $d[sortir] LIMIT $d[offset], $d[limit]";
$out=$this->sql('r','Table',$sql);
echo json_encode($out);
}
}
?>
