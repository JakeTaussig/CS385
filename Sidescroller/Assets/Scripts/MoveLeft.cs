using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MoveLeft : MonoBehaviour
{
    // Start is called before the first frame update
    public float speed;
    private DogController playerControllerScript;
    private float leftBound = -10;
    void Start()
    {
        speed = 10;
        playerControllerScript = GameObject.Find("Dog").GetComponent<DogController>();
    }

    // Update is called once per frame
    void Update()
    {
        speed += .002F;
        if (playerControllerScript.gameOver == false)
        {
            transform.Translate((Vector3.left) * Time.deltaTime * speed);
        }

        if (transform.position.x < leftBound && gameObject.CompareTag("Obstacle"))
        {
            Destroy(gameObject);
        }
    }
}
